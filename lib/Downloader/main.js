"use strict"
const 
    fs = require('fs'),
    path = require('path'),
    URL = require("url"),
    EventEmitter = require('events'),
    request = require('../request'),
    Parser = require('../Parser'),
    Pool = require('./pool'),
    utils = require("../utils"),
    Cache = require('./Cache'),
    Chapter = require('../book/Chapter'),
    Book = require('../book'),
    Ebk = require('../ebook'),
    Sites = require('../sites');


var noop = function(){};

function leftAlign(str,len,sign){
    len = len || 5;
    sign = sign || "0";
    str = String(str);
    if (str.length >= len){
        return str;
    }else {
        return Array(len-str.length).fill(sign).join("") + str;
    }
}
function isJPG(buffer){
    return [0xff,0xd8].every(function (v,i){
        return buffer[i] == v;
    });
}
function isCompleteJPG(buffer){
    var len = buffer.length;
    var chunk = buffer.slice(len-10);
    for (var i=0;i<chunk.length-1 ;i++ ){
        if (chunk[i] == 0xff && chunk[i+1] == 0xd9){
            return true
        }
    }
    return false;
}

/**
 * Class Downloader.
.* Inherit from EventEmitter.
*/
class Downloader extends EventEmitter{
    /**
     * Constructor Downloader
     * @param {string} args
     * @return instance [Downloader Object].
     */
    constructor(...args){
        super();
        this.__CONFIG__ = utils.clone(require('./config'));
        this.init(...args);
    }
    /**
     * init the Downloader properties.
     * if the arguments number is more than one, the redundant arguments will be set as mergeURLs.
     * @param {string} args
     * @return this.
     */
    init(...args){
        this._URL = args.shift();
        this._MergedURL = args;
        this._cache = new Cache();
        this._meta = null;
        this._isEnd = false;
        this._hasNewChapter = false;
        this._delayTime = 10;
        return this;
    }
    /**
     * restart the downloader.
     * set the property {_isEnd} false.
     * @return this.
     */
    reStart(){
        this._isEnd = false;
        return this;
    }
    /**
     * add merge urls. indexs paesed from these urls will be merged.
     * @param {string} urls
     * @return this.
     */
    mergeIndexURLs(...urls){
        this._MergedURL.push(...urls);
        return this;
    }
    /**
     * retrun a same instance of this. all the config will be copied.
     * @param {string} urls
     * @return this.instance [Downloader Object].
     */
    spawn(...args){
        return new this.constructor(...args).config(this.__CONFIG__);
        //return Object.create(this).init(...args).config(this.__CONFIG__);
    }
    /**
     * save the html cache
     * @param {string} url
     * @param {string} html
     * @return this.
     */
    setCache(url,string){
        this._cache.set(url,string);
        return this;
    }
    /**
     * get the html cache by url.
     * @param {string} url
     * @return {string} html.
     */
    getCache(url){
        return this._cache.get(url);
    }

    config(key,val){
        if (typeof key === "object"){
            for (var k in key) {
              this.config(k, key[k]);
            }
            return this;
        }
        if (typeof val == "undefined"){
            this.__CONFIG__[key] = !this.getConfig(key);
            return this;
        }
        this.__CONFIG__[key] = val;
        return this;
    }

    getConfig(key){
        return this.__CONFIG__[key];
    }

    searchSite(){
        console.log("开始检索下载规则...");
        let site = this._site = Sites.find(this._URL);
        let parsedURL = URL.parse(this._URL);
        if (site.siteURL && !this._URL.match(site.siteURL)){
            this._URL = URL.resolve(site.siteURL,parsedURL.path)
        }
        return this;
    }

    delay(time){
        this._delayTime = time;
        return this;
    }

    ebook(){
        this.config("genEbook",!this.getConfig("genEbook"));
        return this;
    }

    getHTMLContent(url,resolve,reject,times){

        if (this._lastRequestTime){
            let timeout = +this._lastRequestTime + this._delayTime - new Date();
            if (timeout > 0){
                setTimeout(()=>{
                    this._lastRequestTime = +new Date;
                    this.getHTMLContent(url,resolve,reject,times);
                },timeout);
                return;
            }
        }
        resolve = resolve || noop;
        reject = reject || noop;
        times = times || 5;

        let cache = this.getCache(url);
        if (cache) return resolve(cache);

        utils.autoRetry({
            promise:() => {return request.get(url)},
            resolve:(data) => {
                this.setCache(url,Parser.decode(data,this._site && this._site.charset));
                resolve(data);
            },
            reject:reject,
            times:times
        });

        return this;
    }

    getSourceHTML(callback){
        this.getHTMLContent(this._URL,callback,()=>this.end());
    }

    getBookInfo(data,callback){
        if (this._isEnd) return this;
        console.log("开始解析书籍信息...");
        Parser.init(data,this._URL);
        let infoUrl = Parser.getInfoPage();
        this.getHTMLContent(infoUrl,(data) => {
            Parser.init(data,infoUrl);
            this._meta = Parser.getBookInfos();
            callback();
        },() => {
            this.end();
        });
    }

    createBookFolder(callback){
        if (this._isEnd) return this;
        console.log("开始创建书籍文件夹...");
        let info = this._meta;
        if (!info.title) return this.end();
        info.author = info.author || this._site.siteName;
        let dir = this._dir = path.join("./",info.author,info.title);
        utils.mkdirs(dir,callback);
        return this;
    }

    getBookCover(callback){
        if (this._isEnd) return this;
        console.log("开始下载封面...");
        let info = this._meta;
        this.getImages({
            src:info.cover,
            file:"cover.jpg"
        },callback);
        return this;
    }

    getBookIndex(data,callback){
        if (this._isEnd) return this;
        console.log("开始获取书籍目录...");
        this._Quest = new Pool(this._URL);
        Parser.init(data,this._URL);
        let ajaxReq = Parser.parseIndexPage().ajax;
        let indexs = Parser.getIndexUrls();
        if (ajaxReq) return this.ajaxBookIndex(ajaxReq,callback);
        if(indexs){
            this._Quest.extend(indexs);
            callback();
            return this;
        }
        return this;
    }

    ajaxBookIndex(ajaxReq,callback){
        utils.autoRetry({
            promise:() => request.ajax(ajaxReq),
            resolve:(data) => {
                this._Quest.extend(data);
                callback();
            },
            reject:() => {this.end();}
        });
        return this;
    }

    mergeBookIndex(callback){
        if (this._isEnd) return this;
        console.log("合并多个下载源...");
        utils.parallel(this._MergedURL,(url,next) => {
            console.log(url);
            this.getHTMLContent(url,(data)=>{
                this._Quest.extend(Parser.init(data,url).getIndexUrls());
                next();
            },next);
        },callback,this.getConfig("mergeRate"));
        return this;
    }

    filterBookIndex(){
        if (this._isEnd) return this;
        console.log("过滤书籍目录...");
        if (this.getConfig("overOldChapters")){
            return this;
        }
        let Ids = this._book.list.valueOf();
        this._Quest.filter(task => !(task.id in Ids));
        return this;
    }

    filterEmptyChapter(){
        this._book.list = this._book.list.filter(item=>item.size > 10)
        return this;
    }

    carryQuest(){
        if (this._isEnd) return this;
        console.log("开始下载书籍章节...");
        let Quest = this._Quest.tasks;
        let QuestSize = Quest.length;
        let maxThreads = this.getConfig("maxThreads");
        if (QuestSize === 0 && !this._running){
            return this.end();
        }
        this._running = this._running || 0;
        maxThreads = Math.min(QuestSize,maxThreads-this._running);
        if (!maxThreads) return this;
        utils.parallel(Quest,(task,next)=>{
            this._running += 1;
            QuestSize -= 1;
            console.log(`正在运行${this._running}个下载任务，剩余${QuestSize}个任务...`);
            this.getHTMLContent(task.source,(data)=>{
                this.resolveChapter(task,data,next);
            },()=>{
                this.rejectChapter(task,next);
            });
        },()=>this.end(),maxThreads);
        return this;
    }

    resolveChapter(task,data,next){
        let content = Parser.init(data,task.source).getContent();
        let parsed = Parser.parseContentPage();
        let callback = (content) =>{
            if (!this.getConfig("downloadImages")) return this.saveChapter(task,content,next);
            let imageFiles = this.getChapterImages(task,content);
            if(imageFiles.length > 0){
                utils.mkdirsSync(path.join(this._dir,task.id));
                this.getImages(imageFiles,()=>this.saveChapter(task,content,next));
            }else{
                this.saveChapter(task,content,next);
            }
        };
        if (parsed.nextPage){
            this.mergeChapter(content,parsed.nextPage,callback);
        }else if (parsed.ajax){
            this.ajaxChapter(parsed.ajax,callback)
        }else if (content){
            callback(content);
        }else {
            this.rejectChapter(task,next);
        }
    }

    rejectChapter(task,next){
        this._running -= 1;
        console.log(`第${task.id}章下载失败...`);
        next();
    }

    mergeChapter(content,nextPage,callback,deep){
        console.log("合并章节内容...")
        let thisDeep = deep || 0;
        if (nextPage && thisDeep < Number(this.getConfig("maxDeep"))){
            nextPage = URL.resolve(this._URL,nextPage);
            console.log(nextPage);
            thisDeep += 1;
            this.getHTMLContent(nextPage,(data)=>{
                let nextContent = Parser.init(data,nextPage).getContent();
                let parsed = Parser.parseContentPage();
                if (nextContent){
                    if (!content){
                        content = nextContent;
                    }else {
                        content += "\n";
                        content += nextContent;
                    }
                }
                this.mergeChapter(content,parsed.nextPage,callback,thisDeep);
            },()=>{
                callback(content);
            },Infinity);
        }else {
            callback(content);
        }
    }

    ajaxChapter(ajaxReq,callback){
        ajaxReq.url = URL.resolve(this._URL,ajaxReq.url);
        utils.autoRetry({
            promise:()=>request.ajax(ajaxReq),
            resolve:(data)=>{
                let content = Parser.init(Parser.decode(data),ajaxReq.url).getContent();
                callback(content);
            },
            reject:()=>callback(null)
        });
        return this;
    }

    getChapterImages(task,content){
        let $ = Parser.load(content).$;
        let files = $("img").map((i,v)=>{
            let src = $(v).attr("src"),
                extFound = path.extname(src).match(/\.(jpg|png|gif|bmp|tif)/) || [],
                ext = "." + (extFound[1] || "jpg"),
                file = path.join(task.id,leftAlign(i,4)+ext);
            return {src:src,file:file}
        }).toArray();
        return files;
    }

    getImages(req,callback){
        callback = callback || noop;
        if (!Array.isArray(req)) req = [req];

        let allSuccess = true;
        utils.parallel(req,(req,next) => {
            if(!req.src) return next();
            let src = req.src;
            let file = path.resolve(this._dir,req.file);
            fs.exists(file,(exists) => {
                if(exists) return next();
                utils.autoRetry({
                    promise:() => request.get(src).type("image"),
                    resolve:(data) => fs.writeFile(file,data,next),
                    reject:()=>{allSuccess=false;next()}
                });
            });
        },()=>{
            if (!allSuccess) this.config("nosaveChapter",true);
            callback();
            this.config("nosaveChapter",false);
        });
        return this;
    }

    parseAllsource(data,url){
        let $ = Parser.load(data).$;
        let urls = $("a")
            .map((i,v)=>$(v).attr("href"))
            .toArray()
            .filter(v=>v)
            .filter(v=>!v.match(/javascript:/i))
            .map(v=>URL.resolve(url,v));
        let imgs = $("img")
            .map((i,v)=>$(v).attr("src"))
            .toArray()
            .filter(v=>v)
            .map(v=>URL.resolve(url,v));
        let links = $("link")
            .map((i,v)=>$(v).attr("href"))
            .toArray()
            .filter(v=>v)
            .map(v=>URL.resolve(url,v));
        let jss = $("img")
            .map((i,v)=>$(v).attr("src"))
            .toArray()
            .filter(v=>v)
            .map(v=>URL.resolve(url,v));
        return {
            "as":urls,
            "imgs":imgs,
            "links":links,
            "jss":jss
        }
    }

    saveChapter(task,content,next){
        this._running -= 1;
        console.log(`第${task.id}章下载完成...`);
        if (this.getConfig("nosaveChapter")){
            next();return this;
        }
        let chapter = new Chapter(task,content);
        let book = this._book;
        Chapter.export(chapter,(data)=>{
            fs.writeFile(path.join(this._dir,`${task.id}.json`),data,(e)=>{
                if (!e){
                    this._hasNewChapter = true;
                    task.size = content.length;
                    book.list.append(task);
                }
                next();
            });
        });
        return this;
    }

    importBook(callback){
        console.log("开始导入书籍目录...");
        let dir = this._dir;
        let meta = this._meta;
        Book.load(dir,(e,book) => {
            let url = book.meta.source;
            let changeSource = this.getConfig("changeSource");
            this._book = book;
            meta && book.meta.merge(meta);

            if(!this._URL){
                if (url){
                    this._URL = url;
                }else {
                    return this.end();
                }
            }

            if (url == this._URL){
                return callback();
            }else if (!url || changeSource){
                book.meta.set("source",this._URL,true);//true强制修改source
                book.saveTo();
                return callback();
            }else{
                this._URL = url;
                return callback();
            }
        });
        return this;
    }

    outportBook(){
        this.end(()=>{
            let book = this._book;
            if (!book) return this;
            console.log("导出书籍目录及信息...")
            book.setMeta("date",new Date().toLocaleString());
            book.saveTo();
        });
        return this;
    }

    generateEbook(){
        this.end(()=>{
            let 
                genEbook = this.getConfig("genEbook"),
                dir = this.getConfig("ebookDirectory"),
                forceEbook = this.getConfig("forceEbook"),
                format = this.getConfig("ebookFormat"),
                fn = Ebk[`${format}Async`],
                book = this._book;

            if (!fn) return this;
            if (!genEbook && !forceEbook) return this;
            if (!this._hasNewChapter && !forceEbook) return this;
            if (!book) return this;

            let meta = this._book.meta,
                author = meta.author,
                title = meta.title,
                filename = path.join(dir,`${author} - ${title}.${format}`);
            setTimeout(() => {
                utils.mkdirsSync(dir);
                console.log(`开始制作电子书...\n${filename}`);
                book.use(fn,(data)=>{fs.writeFile(filename,data,noop)});
            },1000);
        });
        return this;
    }

    changeSourceURL(callback){
        let 
            book = this._book,
            url = book.meta.source;

        if (this.getConfig("changeSource") || !url){
            book.meta.set("source",this._URL);
            callback();
        }else {
            this.spawn().update(this._dir);
        }
        return this;
    }

    dataBase(db){
        if (!db)return this;
        this.end(()=>this.sendToDatabase(db));
        return this;
    }

    sendToDatabase(db){
        let book = this._book;
        if (!book || !db)return this;
        let record = {},
            meta = book.meta;
        Object.keys(meta)
            .filter(k=>String(meta[k]).length < 800)
            .forEach(k=>record[k]=meta[k]);
        db.insert(this._dir,record);
        return this;
    }

    series(...args){
        utils.async.thread().series(...args);
        return this;
    }

    execute(){
        if (!this._URL) return this.end();
        if (utils.isArray(this._URL)){
            this.series(this._URL.map((url)=>(next)=>{this.spawn(url).end(next).execute()}));
            return this.end();
        }
        this.series([
            ()=>{this.searchSite();},
            (next)=>{this.getSourceHTML(next);},
            [
                (data,next)=>{this.getBookInfo(data,next);},
                (data,next)=>{this.getBookIndex(data,next);},
            ],
            (next)=>{this.createBookFolder(next);},
            [
                (next)=>{this.getBookCover(next);},
                (next)=>{this.importBook(next);},
                (next)=>{this.mergeBookIndex(next);},
            ],
            ()=>{this.filterBookIndex();},
            ()=>{this.generateEbook();},
            ()=>{this.carryQuest();},
            ()=>{this.outportBook();}
        ]);
        return this;
    }

    update(dir){
        this.series([
            ()=>{this._dir = dir;},
            (next)=>{this._book ? next():this.importBook(next);},
            ()=>{this.searchSite();},
            (next)=>{this.getSourceHTML(next);},
            (data,next)=>{this.getBookIndex(data,next);},
            (next)=>{this.mergeBookIndex(next);},
            ()=>{this.filterBookIndex();},
            ()=>{this.generateEbook();},
            ()=>{this.carryQuest();},
            ()=>{this.outportBook();}
        ]);
        return this;
    }

    overide(id,url){
        let book = this._book;
        let chapter = book.list.get(id);
        if (!chapter)return this;
        this.series([
            (next)=>this.getHTMLContent(url,next),
            (data,next)=>{
                chapter.source = url;
                this.resolveChapter(chapter,data,noop);
            }
        ]);
        return this;
    }

    copySite(url){
        let parsedURL = URL.parse(url);
        let host = parsedURL.host;
        let path = parsedURL.path;
        let dir = path.dirname(path);
        let logs = {};
        this.series([
            (next)=>this.getHTMLContent(url,next),
            (data,next)=>{
                let files = this.parseAllsource(data,url);
                let doc = Parser.decode(data).doc;
                utils.mkdirs(dir,fs.writeFile(path,doc,e=>{
                }));
            }
        ]);
    }

    test(){
        this.saveChapter = console.log;
        this.series([
            ()=>{this.searchSite();},
            (next)=>{this.getSourceHTML(next);},
            [
                (data,next)=>{this.getBookInfo(data,next);},
                (data,next)=>{this.getBookIndex(data,next);},
            ],
            [
                ()=>{console.log(this._meta)},
                ()=>{console.log(this._Quest.tasks)},
                ()=>{console.log(this._Quest.filter(()=>Math.random()*this._Quest.size()<5))},
            ],
            ()=>{this.carryQuest();}
        ]);
    }

    convertEbook(dir,format){
        this.series([
            ()=>{this._dir = dir;},
            (next)=>{this._book ? next():this.importBook(next);},
            ()=>{this.config({"genEbook":true,"forceEbook":true,"ebookFormat":format||"epub"});},
            ()=>{this.generateEbook();},
            ()=>{this.end();},
        ]);
        return this;
    }

    plugin(name,fun){
        this.constructor.prototype[name] = fun;
        return this;
    }

    extend(name,fun){
        if (name in this){
            throw new Error(`${name} is existed in this namespace.`);
        }
        this[name] = fun;
        return this;
    }

    end(fn){
        if (this._isEnd)return this;
        if (fn){
            this.on("end",fn);
            return this;
        }
        console.log("书籍下载结束...");
        this._isEnd = true;
        this.emit("end");
        return this;
    }
}


//new Downloader([["http://www.shumilou.co/xiakexing/"],["http://www.shumilou.co/kuaichuanzhihougongsanqian/"]]).ebook().execute()

module.exports = Downloader
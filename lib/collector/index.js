var fs = require('fs'),
    path = require('path'),
    URL = require("url"),
    events = require('events'),
    inherits = require('util').inherits,
    request = require('../request'),
    Parser = require('../Parser'),
    Pool = require('./pool'),
    Chapter = require('../book/Chapter'),
    Book = require('../book'),
    Ebk = require('../ebook'),
    Sites = require('../sites');


var noop = function(){};

var makedirsSync = function (dir){
    if (fs.existsSync(dir)){
        return
    }
    var dirname = path.dirname(dir);
    fs.existsSync(dirname) || makedirsSync(dirname);
    fs.mkdirSync(dir);
};

var autoRetry = function (options){
    var times = 0;
    var maxtimes = options.max || 5;
    var resolve = options.resolve;
    var reject = options.reject || noop;
    var promise = options.promise;
    (function (){
        var callee = arguments.callee;
        promise().then(resolve,function(e){
            ++times < maxtimes ? callee() : reject(e);
        });
    })()
};

var autoContinue = function (array,fn){
    (function (){
        var item = array.shift();
        item && fn(item,arguments.callee)
    })()
}

var parallel = function (array,fn,num){
    for (var i=0;i<num ;i++ ){
        autoContinue(array,fn)
    }
}

function Downloader(){
    events.EventEmitter.call(this);
    return this.init.apply(this,arguments);
}
inherits(Downloader,events.EventEmitter);
Downloader.prototype.config = require('./config');
Downloader.prototype.set = function (key,val){
    if (typeof key === "object"){
        for (var k in key) {
          this.set(k, key[k]);
        }
        return this;
    }
    this.config[key] = val;
    return this
}
Downloader.prototype.init = function (url){
    if (!url){
        return this.end();
    }
    this.site = Sites.find(url);
    if (!this.site)return this.end();
    this.URL = url;
    this.book = null;
    this.Quest = null;
    var self = this;
    autoRetry({
        promise:function(){return request.get(url)},
        resolve:function (data){
            //解析下载目录
            self.Quest = new Pool(url);
            self.Quest.extend(Parser.init(data,url).getIndexUrls());
            //解析信息页
            self.getBookInfos(Parser.getInfoPage());
        },
        reject:function (){
            self.end();
        }
    });
    return this;
};
Downloader.prototype.getBookInfos = function (infoUrl){
    var self = this,infos;
    //如果信息页即为当前页面
    if (infoUrl === this.URL){
        infos = Parser.getBookInfos();
        this.importBook(infos);
    }else {//信息页不是当前页面
        autoRetry({
            promise:function(){return request.get(infoUrl)},
            resolve:function (data){
                infos = Parser.init(data,infoUrl).getBookInfos();
                self.importBook(infos);
            },
            reject:function(){
                self.end();
            }
        });
    }
};
Downloader.prototype.importBook = function (infos){
    //根据书籍信息导入书籍
    if (!infos.author || !infos.title){
        return this.end();
    }
    var dir = this.dir = path.join("./",infos.author,infos.title);
    makedirsSync(dir);
    Book.load(dir,function (e,book){
        console.log(dir)
        if (e){
            this.book = new Book(dir);
            this.book.meta.merge(infos);
            this.book.meta.set("source",this.URL);
            this.book.saveTo();
            this.emit("init");
        }else {
            this.book = book;
            book.meta.merge(infos);
            this.changeSource();
        }
    }.bind(this));
    return this;
};
Downloader.prototype.changeSource = function (){
    //如果书籍已经下载过，是否换源
    var url = this.book.meta.source;
    //当书籍来源不一致
    if (url && url !== this.URL && !this.config.changeSource){
        //使用原来的地址下载
        this.init(url);
        return this;
    }
    //书籍没有下载，或来源一致，或强制换源
    this.book.meta.set("source",this.URL);
    this.book.saveTo();
    //this.book.list.init();
    this.emit("init");
    return this;
}
Downloader.prototype.update = function (dir){
    var self = this;
    Book.load(dir,function (e,book){
        if (e)return self.end();
        console.log(dir);
        console.log("书籍已存在，开始更新...");
        self.dir = dir;
        self.book = book;
        var url = book.meta.source;
        self.site = Sites.find(url);
        //如果网址域名发生改变，自动修正到最新
        self.URL = url = URL.resolve(self.site.siteURL,URL.parse(url).path);
        book.meta.set("source",self.URL);
        autoRetry({
            promise:function(){return request.get(url)},
            resolve:function (data){
                self.Quest = new Pool(url);
                self.Quest.extend(Parser.init(data,url).getIndexUrls());
                self.emit("init");
            },
            reject:function(){
                self.end();
            }
        });
    });
    return this;
};
Downloader.prototype.start = function (){
    if (!this.book || !this.Quest){
        //等待初始化,延迟执行
        console.log("等待项目初始化...")
        return this.on("init",this.start.bind(this));
    }
    console.log("开始启动项目任务...");
    this.pushQuestStack();
    this.postQuest();
    this.file({src:this.book.meta.cover,file:"cover.jpg"});
    return this;
};
Downloader.prototype.merge = function (url){
    //合并多个下载源
    var self = this;
    this.childs = this.childs || [];
    function callback(){
        console.log("合并多个下载源");
        parallel(self.childs,function (url,callback){
            console.log(url);
            autoRetry({
                promise:function(){return request.get(url)},
                resolve:function (data){
                    self.Quest.extend(Parser.init(data,url).getIndexUrls());
                    self.pushQuestStack();
                    self.postQuest();
                    callback();
                }
            });
        },4);
    };
    if (this.childs.length === 0){
        this.childs.push(url);
        if (!this.book){
            //等待初始化,延迟执行
            this.on("init",callback);
        }else {
            callback();
        }
    }else {
        this.childs.push(url);
    }
    return this;
};
Downloader.prototype.pushQuestStack = function (){
    //过滤需要下载的连接
    var ids = this.book.list.valueOf();
    this.Quest.filter(task => !(task.id in ids));
    return this;
};
Downloader.prototype.postQuest = function (){
    var QuestSize = this.Quest.tasks.length;
    if (QuestSize === 0){
        this.end();
        return
    }
    var threads = this.site.maxThreads || this.config.maxThreads;
    this.running = this.running || 0;
    threads = Math.min(QuestSize,threads-this.running);
    for (var i=0;i<threads;i++){
        this.execute();
    }
    return this;
};
Downloader.prototype.execute = function (){
    var task = this.Quest.shift();
    if (task){
        this.running += 1;
        this.run(task);
    }
    console.log("正在运行"+this.running + "个下载任务，剩余"+this.Quest.tasks.length + "个任务...");
    if (this.running <= 0) this.end();
    return this;
};
Downloader.prototype.run = function (task){
    var book = this.book;
    var self = this;
    autoRetry({
        promise:function(){return request.get(task.source)},
        resolve:function (data){
            self.resolve(task,data);
        },
        reject:function (e){
            console.log(e)
            self.reject(task);
        }
    });
    return this;
};
Downloader.prototype.reject = function (task){
    console.log(["第",task.id,"章下载失败..."].join(""));
    this.Quest.append(task);
    this.next();
}
Downloader.prototype.resolve = function (task,data){
    var self = this;
    var content = Parser.init(data,task.source).getContent();
    var parsed = Parser.parseContentPage();
    var callback = function(chap){self.saveChapter(task,chap)};
    if (parsed.nextPage){
        this.joinPage(content,parsed.nextPage,callback);
    }else if (parsed.ajax){
        this.ajax(parsed.ajax,callback)
    }else if (content != null){
        callback(content);
    }else {
        this.reject(task);
    }
};
Downloader.prototype.saveChapter = function (task,content){
    console.log(["第",task.id,"章下载完成..."].join(""));
    var chapter = new Chapter(task,content);
    var self = this;
    Chapter.export(chapter,function(data){
        fs.writeFile(path.join(self.dir,task.id+".json"),data,function (e){
            if (!e){
                self._isNew = true;
                self.book.list.append(task);
            }
            self.emit(task.id,content);
            self.next();
        });
    });
};
Downloader.prototype.next = function (){
    this.running -= 1;
    this.execute();
};
Downloader.prototype.joinPage = function (content,nextPage,callback,deep){
    deep = deep || 0;
    if (nextPage && deep < Number(this.config.maxDeep)){
        nextPage = URL.resolve(this.URL,nextPage);
        console.log(nextPage)
        deep += 1;
        autoRetry({
            promise:function(){return request.get(nextPage)},
            resolve:function (data){
                var nextContent = Parser.init(data,nextPage).getContent();
                var parsed = Parser.parseContentPage();
                if (!content){
                    content = nextContent;
                }else if (nextConten){
                    content += "\n";
                    content += nextContent;
                }
                this.joinPage(content,parsed.nextPage,callback,deep);
            }.bind(this),
            max:Infinity
        });
    }else {
        callback(content);
    }
};
Downloader.prototype.ajax = function (options,callback){
    options.url = URL.resolve(this.URL,options.url);
    autoRetry({
        promise:function(){return request.ajax(options)},
        resolve:function (data){
            var content = Parser.init(data,options.url).getContent();
            callback(content);
        },
        max:Infinity
    });
    return this;
}
Downloader.prototype.file = function (opt,callback){
    var self = this;
    if (opt instanceof Array){
        parallel(opt,function (it,next){
            self.file(it,next)
        },2)
        return this
    }
    callback = callback || noop;
    if (!opt.src){
        callback();
        return this
    }
    var file = Parser.filterFileName(path.basename(opt.file || opt.src));
    file = path.resolve(this.dir,file);
    fs.exists(file,function (exists){
        if (exists){
            callback()
        }else {
            var req = request.get(URL.resolve(self.URL,opt.src));
            req.pipe(fs.createWriteStream(file));
            req.on("end",callback)
        }
    });
    return this;
};
Downloader.prototype.end = function (){
    var self = this;
    if (this.timer){
        clearTimeout(this.timer);
    }
    this.timer = setTimeout(function (){
        console.log("章节下载完成...");
        self.emit("end");
        self._end = true;
        //fs.writeFile(path.join(self.dir,"book.proj"),self.toString());
        if (self.book && self._isNew){
            self.book.meta.set("date",new Date().toLocaleString());
            self.book.saveTo();
        }
        clearTimeout(self.timer);
    },500);
    return this
};
Downloader.prototype.ebook = function (format,dir){
    var format = format||this.config.ebook;
    var fn = Ebk[format];
    var dir = this.config.ebookDirectory;
    this.on("end",function (){
        if (!this._isNew) return
        var file = path.join(dir,this.book.meta.author + " - " + this.book.meta.title + "." + format);
        makedirsSync(dir);
        fs.writeFile(file,this.book.use(fn));
    }.bind(this));
    return this
};
Downloader.prototype.valueOf = function (){
    return {
        "dir":this.dir,
        "site":this.site,
        "URL":this.URL,
        "Quest":this.Quest,
    }
};
Downloader.prototype.toString = function (){
    return JSON.stringify(this.valueOf(),null,4);
};

module.exports = Downloader

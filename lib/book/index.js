var List = require('./List');
var Metadata = require('./Metadata');
var fs = require("fs");
var path = require("path");

var makedirsSync = function (dir){
    if (fs.existsSync(dir)){
        return
    }
    var dirname = path.dirname(dir);
    fs.existsSync(dirname) || makedirsSync(dirname);
    fs.mkdirSync(dir);
};

function walk(root, callback){
    var callee,
        files,
        real,
        filestat;
    (function (root){
        callee = arguments.callee;
        files = fs.readdirSync(root);
        files.forEach(function (file){
            real = path.join(root,file);
            filestat = fs.statSync(real);
            if (filestat.isDirectory() == true){
                callee(real,callback);
            }
            callback(root,file);
        })
    })(root);
    callee = files = real = filestat = null;
}

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

function Book(dir){
    this.location = dir;
    this.meta = new Metadata;
    this.list = new List;
    /*if (typeof book === "string" && fs.existsSync(book)){
        this.location = book;
        var file = path.join(book,"index.book");
        if (!fs.existsSync(file)){
            console.log("书籍信息不存在...");
        }else {
            console.log("开始加载书籍信息...");
            try{
                var content = fs.readFileSync(file).toString();
                var obj = JSON.parse(content);
            }
            catch (e){
                console.log(e);
                var obj = {};
            }
            if (obj.meta instanceof Object){
                this.meta = new Metadata(obj.meta);
            }
            if (obj.list instanceof Array){
                this.list.concat(obj.list);
            }else if (obj.list instanceof Object){
                for (var id in obj.list){
                    var cha = obj.list[id];
                    cha.id = id;
                    this.list.append(cha);
                }
            }
        }
        console.log("开始检索已下载章节信息...")
        var self = this;
        var ids = this.list.valueOf();
        walk(book,function (root,file){
            if (path.basename(file,".json") in ids){
                return
            }
            if (path.extname(file) !== ".json"){
                return
            }
            var f = path.join(root,file);
            var content = fs.readFileSync(f).toString();
            try{
                content = JSON.parse(content);
                self.list.append({
                    "title":content.title,
                    "source":content.source,
                    "id":content.id
                });
            }catch (e){
                console.log(e)
            }
        });
        //this.saveTo();
    }*/
}

Book.prototype.loadChapter = function (){
    var dir = this.location;
    this.list.each(function (item){
        item.getContent(dir);
    });
}

Book.prototype.toString = function (){
    return JSON.stringify(this.toJSON(),null,4)
}

Book.prototype.toJSON = function (){
    var obj = {};
    obj.meta = this.meta;
    obj.list = this.list.toArray();
    return obj;
}

Book.prototype.saveTo = function (dir){
    console.log("开始保存书籍信息...")
    var _dir = this.location;
    if (_dir == dir || !dir){
        fs.writeFile(path.join(_dir,"index.book"),this.toString());
    }else {
        makedirsSync(dir);
        fs.writeFile(path.join(dir,"index.book"),this.toString());
        this.list.each(function (item){
            if (item.file){
                fs.createReadStream(path.join(_dir,item.file)).pipe(fs.createWriteStream(path.join(dir,item.file)));
            }
        });
    }
}

Book.prototype.use = function (fn){
    return fn(this);
}

Book.load = function (dir,callback){
    var file;
    if (/index.book$/.test(dir)){
        file = dir;
        dir = path.dirname(file);
    }else {
        file = path.join(dir,"index.book");
    }
    fs.readFile(file,function (e,data){
        var book = new Book(dir);
        try{
            var json = JSON.parse(data.toString());
            book.meta = new Metadata(json.meta);
            book.list.concat(json.list);
        }catch (e){
        }
        fs.readdir(dir,function (e,files){
            var list = book.list.valueOf();
            files = files.filter(function (file){
                return path.extname(file) == ".json"
            });
            (function (){
                var file = files.pop();
                var callee = arguments.callee;
                if (!file){
                    var _list = new List;
                    book.list.each(function (chapter){
                        if (!list[chapter.id]){
                            _list.append(chapter);
                        }
                    });
                    book.list = _list;
                    return callback(null,book);
                }
                var id = path.basename(file,".json");
                if (list[id]){
                    delete list[id];
                    callee();
                }else {
                    fs.readFile(path.join(dir,file),function (e,data){
                        try{
                            data = data.toString();
                            data = JSON.parse(data);
                            book.list.append({
                                "title":data.title,
                                "source":data.source,
                                "id":data.id
                            });
                            callee();
                        }catch (e){
                            callee();
                        }
                    });
                }
            })()
        });
    });
}

module.exports = Book;
var List = require('./List');
var Metadata = require('./Metadata');
var fs = require("fs");
var path = require("path");
var utils = require("../utils");


function Book(dir){
    this.location = dir;
    this.meta = new Metadata;
    this.list = new List;
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

Book.prototype.setMeta = function (attr,val){
    this.meta.set(attr,val,true);
}

Book.prototype.filterList = function (fn){
    this.list = this.list.filter(fn);
}

Book.prototype.saveTo = function (dir){
    console.log("开始保存书籍信息...")
    var _dir = this.location;
    if (_dir == dir || !dir){
        fs.writeFile(path.join(_dir,"index.book"),this.toString());
    }else {
        utils.mkdirs(dir,()=>{
            fs.writeFile(path.join(dir,"index.book"),this.toString());
            utils.parallel(this.list.toArray(),(item,next)=>{
                if (item.file){
                    fs.createReadStream(path.join(_dir,item.file)).pipe(fs.createWriteStream(path.join(dir,item.file))).on("end",next);
                }else {
                    return next();
                }
            });
        });
    }
}

Book.prototype.use = function (){
    return [].shift.call(arguments).apply(null,[this].concat([].slice.call(arguments)));
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
        if(e) return callback(e,book)
        try{
            var json = JSON.parse(data.toString());
            book.meta = new Metadata(json.meta);
            book.list.concat(json.list);
        }catch (e){}
        var list = book.list.valueOf();
        var _list = new List;
        fs.readdir(dir,function (e,files){
            if(e)files = [];
            files = files.filter(file=>path.extname(file) === ".json");
            utils.parallel(files,function(file,next){
                var id = path.basename(file,".json");
                if (id in list){
                    _list.append(list[id]);
                    return next();
                }
                fs.readFile(path.join(dir,file),function (e,data){
                    if (e)return next();
                    try{
                        data = data.toString();
                        data = JSON.parse(data);
                        _list.append({
                            "title":data.title,
                            "source":data.source,
                            "id":data.id
                        });
                        return next();
                    }catch (e){
                        console.log(e);
                        console.log(file);
                        return next();
                    }
                });
            },function(){
                book.list = _list;
                return callback(null,book);
            },20)
        });
    });
}

module.exports = Book;
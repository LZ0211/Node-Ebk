var dot = require('../dot'),
    jsonAsync = require('../json/async'),
    path = require('path'),
    fs = require("fs");

var css = fs.readFileSync(path.join(__dirname,"./model/style.css")).toString()
var chapter = dot.template(fs.readFileSync(path.join(__dirname,"./model/chapter.html")));
var coverpage = dot.template(fs.readFileSync(path.join(__dirname,"./model/coverpage.html")));

var template = {
    chapter:function(data){return chapter(data).replace(/&nbsp;/g,"  ").replace(/&para;/g,"\n");},
    coverpage:function(data){return coverpage(data).replace(/&nbsp;/g,"  ").replace(/&para;/g,"\n");},
}

function Files(){
}
Files.prototype.append = function (file,content){
    var arr = file.split(/[\\\/]/);
    var self = this;
    while (arr.length > 1){
        var floder = arr.shift();
        self[floder] = self[floder] || new Files();
        self = self[floder];
    }
    self[arr.shift()] = content;
    return this
};
Files.prototype.get = function (file){
    var arr = file.split(/[\\\/]/);
    var self = this;
    while (arr.length > 1){
        var floder = arr.shift();
        self = self[floder];
        if (!self){
            return
        }
    }
    return self[arr.shift()];
}


module.exports = function (book,callback){
    var files = new Files;
    book.use(jsonAsync,function(obj){
        files.append("css/style.css",css);
        files.append("images/cover.jpg",obj.meta.cover);
        files.append("coverpage.html",template.coverpage(obj));
        obj.list.forEach(function (chapter){
            files.append(chapter.id + ".html",template.chapter(chapter));
        });
        callback(files);
    });
}

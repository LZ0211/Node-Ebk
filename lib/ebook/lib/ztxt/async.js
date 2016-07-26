var Zip = require('../JSZip');
var jsonAsync = require("../json/async");

module.exports = function (book,callback){
    var ebk = new Zip();
    book.use(jsonAsync,function (obj){
        var opt = {createFolders:true};
        var text = "";
        var linesep = "\r\n";
        text += "【书名】：" + obj.meta.title + linesep;
        text += "【作者】：" + obj.meta.author + linesep;
        text += "【类型】：" + obj.meta.classes + linesep;
        text += "【简介】：" + obj.meta.brief.replace(/[\r\n]+/g,linesep) + linesep;
        text += "【正文】" + linesep;
        obj.list.forEach(function (chapter){
            chapter.title = chapter.title.replace(/[\|\\\/\?\:*<>"']+/g,'-');
            chapter.title = chapter.title.replace(/\.*/,'');
            chapter.title = chapter.title.replace(/\s*$/,'');
            ebk.file(chapter.title+".txt",chapter.title + linesep + chapter.content.split(/[\r\n]+/).join(linesep),opt);
            text += chapter.title + linesep;
        });
        ebk.file("cover.jpg", obj.meta.cover, {base64: true,createFolders:true});
        ebk.file('index.txt',text,opt);
        callback(ebk.generate({type:"nodebuffer",compression:'DEFLATE'}));
    });
}
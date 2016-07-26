var jsonAsync = require('../json/async');
module.exports = function (book,callback){
    var text = "";
    var linesep = "\r\n";
    text += "【书名】：" + book.meta.title + linesep;
    text += "【作者】：" + book.meta.author + linesep;
    text += "【类型】：" + book.meta.classes + linesep;
    text += "【简介】：" + book.meta.brief.replace(/[\r\n]+/g,linesep) + linesep;
    text += "【正文】" + linesep;
    jsonAsync(book,function(json){
        json.list.forEach(function (chapter){
            text += chapter.title + linesep;
            text += chapter.content.split(/[\r\n]+/).join(linesep);
            text += linesep;
        });
        callback(text);
    });
};
var json = require('../json');
module.exports = function (book){
    var obj = book.use(json);
    var text = "";
    var linesep = "\r\n";
    text += "【书名】：" + book.meta.title + linesep;
    text += "【作者】：" + book.meta.author + linesep;
    text += "【类型】：" + book.meta.classes + linesep;
    text += "【简介】：" + book.meta.brief.replace(/[\r\n]+/g,linesep) + linesep;
    text += "【正文】" + linesep;
    obj.list.forEach(function (chapter){
        text += chapter.title + linesep;
        text += chapter.content.split(/[\r\n]+/).join(linesep);
        text += linesep;
    });
    return text;
};
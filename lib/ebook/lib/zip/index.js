var Zip = require('JSZip');
var fs = require("fs");
var path = require("path");
var html = require("../html");

module.exports = function (book){
    var ebk = new Zip();
    var files = book.use(html);
    var opt = {createFolders:true};
    book = book.toJSON();
    ebk.file('css/style.css',files.get('css/style.css'),opt);
    ebk.file("images/cover.jpg", files.get('images/cover.jpg'), {base64: true,createFolders:true});
    ebk.file('coverpage.html',files.get('coverpage.html'),opt);
    book.list.forEach(function (chapter,index){
        //console.log(["正在压缩第",chapter.id,"章 已完成",((index+1)/book.list.length*100).toFixed(2)].join(""));
        var file = chapter.id + '.html';
        ebk.file(file,files.get(file),opt);
    });
    return ebk.generate({type:"nodebuffer",compression:'DEFLATE'});
}
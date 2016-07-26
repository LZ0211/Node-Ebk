exports.txt = require('./lib/txt');
exports.txtAsync = require('./lib/txt/async');
exports.html = require('./lib/html');
exports.htmlAsync = require('./lib/html/async');
exports.epub = require('./lib/epub');
exports.epubAsync = require('./lib/epub/async');
exports.zip = require('./lib/zip');
exports.zipAsync = require('./lib/zip/async');
exports.chm = require('./lib/chm');
exports.chmAsync = require('./lib/chm/async');
exports.snb = require('./lib/snb');
exports.snbAsync = require('./lib/snb/async');
exports.ztxt = require('./lib/ztxt');
exports.ztxtAsync = require('./lib/ztxt/async');

var json = require('./lib/json');
exports.json = function (book){
    return JSON.stringify(book.use(json),null,4);
};
var jsonAsync = require('./lib/json/async');
exports.jsonAsync = function (book,callback){
    jsonAsync(book,function(json){
        callback(JSON.stringify(json,null,4));
    });
}
/*
var Book = require("../book");
var fs = require("fs")
Book.load("../collector/明宁/无上皇尊",function(e,book){
    exports.chmAsync(book,(data)=>{fs.writeFile("1111.chm",data)});
});*/
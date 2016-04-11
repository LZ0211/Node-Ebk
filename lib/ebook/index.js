exports.txt = require('./lib/txt');
//exports.html = require('./lib/html');
exports.epub = require('./lib/epub');
exports.zip = require('./lib/zip');
exports.chm = require('./lib/chm');
exports.snb = require('./lib/snb');


var json = require('./lib/json');
exports.json = function (book){
    return JSON.stringify(book.use(json),null,4);
};
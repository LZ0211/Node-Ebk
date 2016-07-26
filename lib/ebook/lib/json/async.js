var fs = require("fs");
var path = require("path");
var utils = require("../utils")


module.exports = function (book,callback){
    var json = {};
    json.meta = book.meta;
    json.list = [];
    utils.parallel(book.list.toArray(),(item,next)=>{
        var chapter = {
            "title": item.title,
            "source": item.source,
            "id": item.id,
            "date": item.date,
            "content":""
        };
        var file = path.join(book.location,item.file);
        fs.readFile(file,(e,data)=>{
            try{
                var string = data.toString();
                var dict = JSON.parse(string);
                chapter.content = dict.content;
                json.list.push(chapter);
                next();
            }catch (e){
                json.list.push(chapter);
                next();
            }
        });
    },()=>{
        json.list.sort((a,b)=>{return a.id - b.id});
        fs.readFile(path.join(book.location,"cover.jpg"),(e,data)=>{
            json.meta.cover = data;
            callback(json);
        });
    });
};
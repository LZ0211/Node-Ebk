var fs = require("fs");
var path = require("path");



module.exports = function (book){
    var json = {};
    json.meta = book.meta;
    json.list = [];
    book.list.sort().each(function (chapter){
        json.list.push({
            "title": chapter.title,
            "source": chapter.source,
            "id": chapter.id,
            "date": chapter.date,
            "content":chapter.getContent(book.location)
        });
    });
    json.meta.cover = fs.readFileSync(path.join(book.location,"cover.jpg")).toString("base64");
    return json
};
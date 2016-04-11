function Chapter(item,content){
    for (var info in item){
        this[info] = item[info];
    }
    this.date = new Date().toLocaleString();
    this.content = content;
}

Chapter.encode = function (chapter){
    return JSON.stringify(chapter,null,4);
}

Chapter.decode = function (string){
    return JSON.parse(string);
}

Chapter.export = function (chapter,fn){
    fn(this.encode(chapter));
}

Chapter.import = function (dir,fn){
    return this.decode(fn(dir))
}

module.exports = Chapter
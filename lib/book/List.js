var path = require('path');
var fs = require('fs');

function leftAlign(str,len,sign){
    len = len || 5;
    sign = sign || "0";
    if (str.length >= len){
        return str;
    }else {
        return Array(len-str.length).fill(sign).join("") + str;
    }
}

function List(){
    this.chapters = [];
    this.logs = {};
    this.length = 0;
}
List.prototype.append = function (chapter){
    if (!chapter.title){
        return this;
    }
    if (chapter.id === undefined){
        chapter.id = leftAlign(this.length+1);
    }
    if (!("content" in chapter)){
        chapter.file = chapter.id + ".json";
    }
    if (chapter.id in this.logs){
        this.chapters[this.logs[chapter.id]] = new ListItem(chapter);
    }else {
        this.chapters.push(new ListItem(chapter));
        this.logs[chapter.id] = this.length;
        this.length += 1;
    }
    return this;
}

List.prototype.concat = function (chapters){
    for (var i=0;i<chapters.length ;i++){
        this.append(chapters[i]);
    }
    return this;
}

List.prototype.init = function (){
    this.chapters = [];
    this.logs = {};
    this.length = 0;
}

List.prototype.get = function (id){
    return this.valueOf()[id];
}

List.prototype.indexOf = function (id){
    for (var i=0;i<this.chapters.length ;i++){
        if (this.chapters[i].id == id){
            return i;
        }
    }
}

List.prototype.eq = function (index){
    if (index < 0){
        index = this.length + index;
    }
    return this.chapters[index];
}

List.prototype.filter = function (fn){
    var list = new List;
    return list.concat(this.chapters.filter(fn));
}

List.prototype.each = function (fn){
    this.chapters.forEach(fn);
    return this;
}

List.prototype.map = function (fn){
    return this.chapters.map(fn);
}

List.prototype.sort = function (fn){
    fn = fn || function (a,b){return a.id - b.id;}
    this.chapters.sort(fn);
    return this;
}

List.prototype.valueOf = function (){
    this.sort();
    var obj = {};
    this.chapters.forEach(function (chapter){
        obj[chapter.id] = chapter;
    });
    return obj;
}

List.prototype.toString = function (){
    this.empty();
    return JSON.stringify(this.valueOf());
}

List.prototype.toArray = function (){
    this.sort();
    this.empty();
    return this.chapters;
}

List.prototype.empty = function (){
    this.each(function (item){
        if (item.file){
            delete item.content;
        }
    });
}

function ListItem(item){
    for (var x in item){
        this[x] = item[x];
    }
    if (!("id" in this)){
        this.id = URL.parse(this.source).path;
    }
}
ListItem.prototype.getContent = function (dir){
    if (this.content){
        return this.content;
    }else {
        this.content =JSON.parse(fs.readFileSync(path.join(dir,this.file)).toString()).content;
        return this.content;
    }
}

module.exports = List;
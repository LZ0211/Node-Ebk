/**
 * Created by Administrator on 2015/12/23 0023.
 */

function Book(dict){
    return this.init.apply(this,arguments);
}

Book.prototype.init = function(dict){
    if (dict instanceof Book){
        return dict;
    }
    this.length = 0;
    this.lists = {};
    this.title = "";
    this.author = "";
    var book = dict||Object.create(Book.prototype),
        self = this;
    this.extend(dict);
    Object.keys(dict.lists).forEach(function (v){
        /*var chapter = v[v.length-1];
        v.push(function (){
            return self.from.match(/shumilou.co/) && chapter.content.match(/^[\u4e00-\u9fa5,\u0000-\u00FF,\x20-\x2f,\x3a-\x40,\x5b-\x60,\x7b-\x7e,\x80-\xff,\u3000-\u3002,\u300a,\u300b,\u300e-\u3011,\u2014,\u2018,\u2019,\u201c,\u201d,\u2026,\u203b,\u25ce,\uff01-\uff5e,\uffe5]+$/)==null
            }
        );*/
        self.append(v,dict.lists[v]);
    });
    this.setInfo("index",this.indexOf());
};

Book.prototype.append = function (id,chapter,filter){
    if (isNaN(parseInt(id))){
        return
    }
    if (filter && filter()){
        return
    }
    if (this.find(id)){
        this.lists[id]=chapter;
        return
    }
    this.lists[id]=chapter;
    this.length += 1;
};

Book.prototype.extend = function (infos){
    var keys = ["author","brief","classes","from","isend","cover","title","date","uuid"];
    var self = this;
    infos = infos || {};
    keys.forEach(function (key){
        if (typeof infos[key] !== "undefined"){
            self[key]=infos[key];
        }
    });
};

Book.prototype.new = function (chapter){
    chapter = chapter || {
        'title': "标题",
        'from': "来源",
        'content' : "内容"
    };
    this.append(this.length,chapter);
}

Book.prototype.infos = function (){
    var keys = ["author","classes","from","isend","title","date","uuid"];
    var self = this,object = {};
    keys.forEach(function (key){object[key] = self[key];});
    var id = self.keys().pop();
    var chapter = self.get(id);
    delete chapter.content;
    chapter.id = id;
    object.last = chapter;
    return object;
};
Book.prototype.setInfo = function (k,v){
    this[k] = v;
};
Book.prototype.getInfo = function (k,v){
    return this[k]
};
Book.prototype.indexOf = function (){
    var self = this;
    return this.keys().map(function(id){
        var ch = self.get(id);
        return {"id":id,"title":ch.title,"from":ch.from}
    })
};

Book.prototype.get = function (id){
    return this.lists[id];
};

Book.prototype.clone = function (id){
    var chapter = this.get[id];
    if (!chapter) {return}
    var res = {};
    Object.keys(chapter).forEach(function (key){res[key] = chapter[key]});
    return res;
}

Book.prototype.find = function (id){
    return typeof this.lists[id] !== "undefined";
};

Book.prototype.keys = function (){
    return Object.keys(this.lists||{}).sort(function(a,b){return a-b});
};

Book.prototype.first = function (){
    return this.get(this.keys().shift());
};

Book.prototype.last = function (){
    return this.get(this.keys().pop());
};

Book.prototype.each = function (fn){
    var self = this;
    self.keys().forEach(function (id){
        fn.apply(null,[id,self.get(id),self]);
    });
};

Book.prototype.pairs = function (){
    var self = this;
    return self.keys().map(function(key){
        return [key,self.get(key)]
    });
};

Book.prototype.toJSON = function (){
    return JSON.stringify(this.valueOf(),null,4)
};

Book.prototype.valueOf = function (){
    var keys = ["title","author","classes","brief","isend","date","uuid","from","cover","lists"];
    var data = {},self=this;
    keys.forEach(function (key){
        data[key]=self[key]
    });
    if (self.last().title){
        data.isend = !!data.isend || !!self.last().title.match(/完本|完结|结局|（完）|终章|（后记）/);
    }
    return data
};
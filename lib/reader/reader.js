var Reader = function (){
    this.forward = [];
    this.history = [];
};

Reader.fn = Reader.prototype;
Reader.fn.load = (function (){
    var callback = [];
    return function (book){
        if (typeof book == "function"){
            callback.push(book)
        }
        else if (typeof book == "object"){
            book = new Book(book)
            this.book = book;
            this.host = book.from;
            this.init();
            callback.forEach(function (fn){
                fn();
            });
        }
    }
})();

Reader.fn.init = function (){
    this.id = null;
    this.index = null;
    this.indexFrom(this.book.indexOf());
};

Reader.fn.indexFrom = function (array){
    this.array = [];
    this.hash = {};
    var self = this;
    UI.$directory.find('option').remove();
    array.forEach(function (info){
        self.hash[info.id] = self.array.length;
        self.array.push(info.id);
        UI.$directory.append('<option value="' + info.id + '">' + info.title + '</option>');
    });
    UI.$directory.show();
}

Reader.fn.get = function (id){
    return this.book.get(id);
};

Reader.fn.new = function(){
    if (!this.book){
        this.book = new Book();
    }
    this.book.new();
    this.init();
}

Reader.fn.cover = function (){
    document.title = this.book.title + " - 封面";
    var content = '';
    content += '<div style="text-align:center"><img class="cover" name="cover" src="data:image/jpeg;base64,' + this.book.cover + '"/>';
    content += '<h1>' + this.book.title + '</h1>';
    content += '<h2>' + this.book.author + '</h2>';
    content += '<h3>状态：' + (this.book.isend ? "已完结":"连载中") + '</h3>';
    content += '<b>简介</b>';
    content += this.book.brief.split("\n").reduce(function(a,b){return a + b + '</p>\n<p>'},'<p>') + '</p></div>';
    UI.$chapter.hide();
    UI.$iframe.hide();
    UI.$title.text('封面').show();
    UI.$cover.html(content).show();
};

Reader.fn.read = function (id){
    var l = this.history.length;
    if (this.id && this.id != this.history[l-1]){
        this.history.push(this.id);
    }//history
    this.id = id;
    this.index = this.hash[id];
    var chapter = this.get(id);
    document.title = this.book.title + " - " + chapter.title;
    UI.$title.text(chapter.title).show();
    UI.$cover.hide();
    UI.$directory.val(this.id);
    if (chapter.content){
        UI.$iframe.hide();
        /*if (chapter.imgs){
            chapter.content = chapter.content.replace(/\{%=(\d+)?%\}/g, function($, $1) {
                return '\n<img src="' + chapter.imgs[$1] + '"/>\n';
            })
        }*/
        var HTML = chapter.content.split(/\n+/).reduce(function(a,b){
            /*if (b.match(/<(a|img) /)){
                return a + b + "<br />"
            }*/
            return a + "<p>" + b + "</p>\n"
        },"")
        UI.$chapter.html(HTML)
        .show()
        .focus()
        .scrollTop(0);
    }
    else if (chapter.file){
        UI.$chapter.hide();
        UI.$iframe.attr("src",[UI.local , this.book.title , chapter.file].join("\\"))
        .show()
        .focus()
        .scrollTop(0);
    }
};
var reader = new Reader();

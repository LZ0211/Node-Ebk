//plugin
Reader.fn.next = function (){
    if (!this.id){
        this.read(this.array[0]);
        return
    }
    var id = this.array[Math.min(this.array.length-1,this.index + 1)];
    this.read(id);
};

Reader.fn.prev = function (){
    var id = this.array[Math.max(0,this.index - 1)];
    this.read(id);
};

Reader.fn.source = function (){
    var chapter = this.get(this.id);
    return chapter ? chapter.from : this.host;
};
//UI
UI.$zoomIn = $('<a href="#" class="btn"><img src="icons/zoom_in.png" class="ico" alt="放大"></a>');
UI.$zoomOut = $('<a href="#" class="btn"><img src="icons/zoom_out.png" class="ico" alt="缩小"></a>');

UI.$showcover = $('<a href="#" class="btn"><img src="icons/picture.png" class="ico" alt="封面"></a>');

UI.$next = $('<a href="#" class="btn"><img src="icons/forward_alt.png" class="ico" alt="下一章"></a>');
UI.$last = $('<a href="#" class="btn"><img src="icons/back_alt.png" class="ico" alt="上一章"></a>');

UI.$top = $('<a href="#" class="btn"><img src="icons/up_alt.png" class="ico" alt="顶部"></a>');
UI.$bottom = $('<a href="#" class="btn"><img src="icons/down_alt.png" class="ico" alt="底部"></a>');

UI.$filter = $('<a href="#" class="btn"><img src="icons/search.png" class="ico" alt="过滤"></a>');

UI.$source = $('<a href="#" class="btn"><img src="icons/globe.png" class="ico" alt="来源"></a>');

UI.$refresh = $('<a href="#" class="btn"><img src="icons/refresh.png" class="ico" alt="刷新"></a>');
//Dom
UI.$Tools.append(UI.$showcover);

UI.$Tools.append(UI.$zoomIn);
UI.$Tools.append(UI.$zoomOut);

UI.$Tools.append(UI.$last);
UI.$Tools.append(UI.$next);

UI.$Tools.append(UI.$bottom);
UI.$Tools.append(UI.$top);

UI.$Tools.append(UI.$filter);

UI.$Tools.append(UI.$source);

UI.$Tools.append(UI.$refresh);
//fn
UI.$showcover.click(function(){
    if (UI.$title.text() != '封面'){
        UI.$title.text('封面').show();
        UI.$chapter.hide();
        UI.$iframe.hide();
        UI.$cover.show();
    }
    else {
        reader.read(reader.id);
    }
});

UI.$zoomIn.click(function (){
    var $chapter = $(".chapter");
    $chapter.css("font-size",parseInt($chapter.css("font-size")) + 2 + "px");
});

UI.$zoomOut.click(function (){
    var $chapter = $(".chapter");
    $chapter.css("font-size",parseInt($chapter.css("font-size")) - 2 + "px");
});

UI.$next.click(function(){
    reader.next();
    UI.$directory.change();
});

UI.$last.click(function(){
    reader.prev();
    UI.$directory.change();
});

UI.$top.click(function(){
    UI.$chapter.animate({scrollTop:0},500);
});

UI.$bottom.click(function(){
    UI.$chapter.animate({scrollTop:UI.$chapter[0].scrollHeight},500);
});

UI.$filter.click(function(){
    var keyword = prompt("章节过滤","");
    if (keyword != null){
        var reg = new RegExp(keyword,"ig");
        reader.indexFrom(reader.book.index.filter(function (ch){
            return reg.test(ch.title);
        }));
    }
});

UI.$source.click(function(){
    var from = reader.source();
    from && window.open(from);
});

UI.$refresh.click(function (){
    reader.read(reader.id);
})
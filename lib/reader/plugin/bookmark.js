//plugin
Reader.fn.setMark = function (){
    if (this.book && this.id){
        localStorage[this.book.title]=this.id;
    }
}
Reader.fn.getMark = function (){
    var id = localStorage[this.book.title];
    id ? this.read(id) : '';
}
//UI
UI.$setmark = $('<a href="#" class="btn"><img src="icons/library_bookmarked.png" class="ico" alt="保存书签"></a>');
UI.$getmark = $('<a href="#" class="btn"><img src="icons/Bookmark.png" class="ico" alt="读取书签"></a>');
//Dom
UI.$Tools.append(UI.$setmark);
UI.$Tools.append(UI.$getmark);
//fn
UI.$setmark.click(function(){
    reader.setMark();
    alert("已保存书签！")
});
UI.$getmark.click(function(){
    confirm("是否前往书签章节？") && reader.getMark()
});

window.onunload=function (){
    reader.setMark();
};

UI.$file.change(function (){
    reader.setMark();
});

reader.load(function (){
    if (reader.book && reader.id){
        reader.setMark();
    }
})
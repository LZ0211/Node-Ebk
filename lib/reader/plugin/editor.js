//plugin
Reader.fn.edit = function (){
    if (!this.id){
        return
    }
    this.canchange = true;
    var chapter = this.get(this.id);
    UI.$directory.hide();
    UI.$content.hide();
    UI.$editor.show();
    UI.$eTitle.val(chapter.title);
    UI.$eContent.val("    " + chapter.content.replace(/\n/g,"\n\n    "));
};

Reader.fn.change = function (){
    UI.$directory.show();
    if (!this.canchange){
        return
    }
    UI.$editor.hide();
    UI.$content.show();
    var info = {};
    info.id = this.id;
    info.title = UI.$eTitle.val();
    info.content = UI.$eContent.val()
        .replace(/\r/ig,"")
        .replace(/^\n+/,"")
        .replace(/\n+$/,"")
        .replace(/\n+/g,"\n");
    var chapter = this.get(this.id);
    for (var x in info){
        if (x in chapter){
            chapter[x] = info[x];
        }
    }
    this.canchange = false;
    this.init();
    this.read(info.id);
    //UI.$download.attr("href","data:application/json;charset=utf8," + {});
};

//UI
UI.$editor = $('<div id="editor" class="content" style="display:none"></div>');
UI.$eTitle = $('<input type="text" class="title"><br />');
UI.$eContent = $('<textarea class="chapter editor"></textarea>').css("background-color","");
UI.$delete = $('<a href="#" class="btn"><img src="icons/document_delete.png" class="ico" alt="删除"></a>');
UI.$edit = $('<a href="#" class="btn"><img src="icons/edit.png" class="ico" alt="编辑"></a>');
UI.$change = $('<a href="#" class="btn"><img src="icons/save.png" class="ico" alt="修改"></a>');

//Dom
UI.$Tools.append(UI.$delete);
UI.$Tools.append(UI.$edit);
UI.$Tools.append(UI.$change);
UI.$editor.append(UI.$eTitle);
UI.$editor.append(UI.$eContent);
$(".book").append(UI.$editor);
//fn
UI.$edit.click(function(){
    reader.edit();
});

UI.$change.click(function(){
    reader.change();
});

UI.$delete.click(function (){
    delete reader.book.lists[reader.id];
    reader.init();
})
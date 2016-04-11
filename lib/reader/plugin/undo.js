//plugin
Reader.fn.undo = function (){
    var id = this.history.pop();
    if (id){
        this.read(id);
        this.forward.push(this.history.pop());//this.id
    }
};
Reader.fn.redo = function (){
    var id = this.forward.pop();
    if (id){
        this.read(id);
    }
};

//UI
UI.$undo = $('<a href="#" class="btn"><img src="icons/undo.png" class="ico" alt="撤销"></a>');
UI.$redo = $('<a href="#" class="btn"><img src="icons/redo.png" class="ico" alt="重做"></a>');

//Dom
UI.$Tools.append(UI.$undo);
UI.$Tools.append(UI.$redo);

//fn
UI.$undo.click(function (){
    reader.undo();
    //UI.$directory.val(reader.id)
});

UI.$redo.click(function (){
    reader.redo();
    //UI.$directory.val(reader.id)
});

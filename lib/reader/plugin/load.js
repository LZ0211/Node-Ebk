//plugin

//UI
UI.$load = $('<a href="#" class="btn"><img src="icons/address_books.png" class="ico" alt="书籍"></a>');
UI.$reload = $('<a href="#" class="btn"><img src="icons/reload.png" class="ico" alt="刷新"></a>');
//Dom
UI.$Tools.append(UI.$load);
UI.$Tools.append(UI.$reload);
//fn
UI.$load.click(function(){
    UI.$file.click();
});

UI.$reload.click(function(){
    UI.$file.change();
});
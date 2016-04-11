//plugin

//UI
UI.$sort = $('<a href="#" class="btn"><img src="icons/sort.png" class="ico" alt="正序"></a>');
UI.$reverse = $('<a href="#" class="btn"><img src="icons/reverse.png" class="ico" alt="倒序"></a>');

//Dom
UI.$Tools.append(UI.$sort);
UI.$Tools.append(UI.$reverse);

//fn
UI.$sort.click(function(){
    reader.indexOf();
});

UI.$reverse.click(function(){
    reader.sortFn = function (a,b){
        return b-a;
    }
    reader.init();
    delete reader.sortFn;
});
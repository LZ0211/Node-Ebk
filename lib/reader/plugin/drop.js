//plugin
//UI
//DOM
//fn
$(this).on({
    dragleave:function(e){//拖离
        e.preventDefault();
    }, 
    drop:function(e){//拖后放
        e.preventDefault();
        //console.log(e.originalEvent)
        var fileList = e.originalEvent.dataTransfer.files;
        //console.log(fileList[0])
        /*if(fileList[0].name.indexOf('.json') === -1){ 
            return false;
        }*/
        var load = function (index){
            index = index || 0
            if (index >= fileList.length){
                return false;
            }
            var file = fileList[index];
            UI.$file[0].files[index] = file;
            var freader = new FileReader();
            freader.readAsText(file,'utf-8');
            freader.onload = function (e) {
                if(FileReader.DONE==freader.readyState){
                    var book = JSON.parse(this.result);
                    if (book.lists){
                        reader.load(book);
                        reader.init();
                        reader.cover();
                    }else {
                        reader.book.append(book.id,book);
                        index += 1;
                        if (!load(index)){
                            reader.init();
                            reader.read(book.id)
                        }
                    }
                }
            };
            return true
        };
        load()
    }, 
    dragenter:function(e){//拖进
        e.preventDefault();
    }, 
    dragover:function(e){//拖来拖去
        e.preventDefault(); 
    }
});
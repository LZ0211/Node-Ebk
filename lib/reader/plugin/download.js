//plugin
Reader.fn.download = function (blob,filename){
    var url = window.URL.createObjectURL(blob);
    var saveas = document.createElement('a');
    saveas.href = url;
    saveas.style.display = 'none';
    document.body.appendChild(saveas);
    saveas.download = filename;
    saveas.click();
    setTimeout(function() {
        saveas.parentNode.removeChild(saveas);
    }, 1000)
    document.addEventListener('unload', function() {
        window.URL.revokeObjectURL(url);
    });
    /*var reader = new FileReader();
    reader.onload = function() {
        var dataUrl = reader.result;
        var alink = $("<a>",{
            download: filename,
            href: dataUrl
        }).get(0);
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, alink);
        alink.dispatchEvent(event);
        console.log("开始保存文件："+filename);
    };
    reader.readAsDataURL(blob);*/
};

//UI
UI.$download = $('<a href="#" class="btn"><img src="icons/archive.png" class="ico" alt="文件"></a>');

//Dom
UI.$Tools.append(UI.$download);

//fn
UI.$download.click(function(){
    var content = reader.book.toJSON();
    var type = {type:"application/json;charset=UTF-8"};
    var bb = new Blob([content],type);
    reader.download(bb,'book.json');
});
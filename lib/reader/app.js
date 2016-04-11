var UI = {
    local : "E:\\MyBooks\\Other\\Hbooks\\Library",
    $file : $("#file"),
    $directory : $('#directory'),
    $content : $('#content'),
    $chapter : $('#chapter'),
    $title : $('#title'),
    $cover : $('#cover'),
    $iframe : $('#iframe'),
    $Tools : $("#toolbar"),
};
UI.$directory.hide();
UI.$file.change(function (){
    var file = $(this)[0].files[0];
    if (!file){
        return
    }
    /*if (file.type.indexOf('json') === -1){
        return
    }*/
    var freader = new FileReader();
    freader.readAsText(file,'utf-8');
    freader.onload = function (e) {
        if(FileReader.DONE==freader.readyState){
            reader.load(JSON.parse(this.result));
            reader.init();
            reader.cover();
        }
    };
});

UI.$directory.change(function(){
    var self = UI.$directory;
    self.find("option:selected").css("color","gray");
    reader.read(self.val());
});

function loadJs(jsurl){
    var nodeScript = document.createElement('script');
    nodeScript.setAttribute('type', 'text/javascript');
    nodeScript.setAttribute('src', jsurl);
    document.body.appendChild(nodeScript);
}
var plugins = ["keyboard.js","drop.js","load.js","sort.js","readbar.js","bookmark.js","editor.js"];

if (!window.ActiveXObject){
    plugins.push("download.js","ebook.js")
}

plugins = plugins.map(function (plugin){
    return "reader/plugin/" + plugin;
});
plugins.forEach(loadJs)
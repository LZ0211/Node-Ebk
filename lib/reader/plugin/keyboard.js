//plugin
//UI
//DOM
//fn
document.onkeyup = function (e) {
    if(navigator.appName == "Microsoft Internet Explorer"){
        var keycode = event.keyCode;
        var realkey = String.fromCharCode(event.keyCode);
    }else{
        var keycode = e.which;
        var realkey = String.fromCharCode(e.which);
    }
    if(keycode==39){UI.$next.click();}
    if(keycode==37){UI.$last.click();}
    if(keycode==40){UI.$chapter.get(0).scrollHeight += 300}
    if(keycode==38){UI.$chapter.get(0).scrollHeight -= 300}
};
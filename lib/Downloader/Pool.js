var URL = require("url");
function leftAlign(str,len,sign){
    len = len || 5;
    sign = sign || "0";
    str = String(str);
    if (str.length >= len){
        return str;
    }else {
        return Array(len-str.length).fill(sign).join("") + str;
    }
}

function Pool(main){
    if (main instanceof Pool){
        return main;
    }
    if (main instanceof Object){
        this.from = main.from;
        this.tasks = main.tasks || [];
        this.logs = main.logs || {};
        this.length = main.length || 0;
        this.ids = main.ids || {};
        return this;
    }
    this.from = main;
    this.tasks = [];
    this.logs = {};
    this.ids = {};
    this.length = 0;
}

Pool.prototype.append = function (url){
    url.href = URL.resolve(this.from,url.href||url.source);
    url.text = url.title||url.text;
    this.logs[url.href] = this.logs[url.href] || 0;
    if (this.logs[url.href] > 3){
        return this;
    }
    var task = {"title": url.text,"source": url.href,"id":url.id};
    if(task.id == undefined || /\D/.test(task.id)){
        return this;
    }
    task.id = leftAlign(task.id);
    this.tasks.push(task);
    this.ids[task.id] = true;
    return this;
}

Pool.prototype.extend = function (urls){
    for (var i=0;i<urls.length ;i++){
        this.append(urls[i])
    }
    return this;
}

Pool.prototype.shift = function (){
    var url = this.tasks.shift();
    if (url){
        this.logs[url.source] += 1;
    }
    return url;
}

Pool.prototype.filter = function (fn){
    this.tasks = this.tasks.filter(fn);
    return this;
}

module.exports = Pool
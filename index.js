var fs = require('fs'),
    path = require('path'),
    Downloader = require('./lib/Downloader');


var makedirsSync = function (dir){
    if (fs.existsSync(dir)){
        return
    }
    var dirname = path.dirname(dir);
    fs.existsSync(dirname) || makedirsSync(dirname);
    fs.mkdirSync(dir);
};


function App(){
    return this.init.apply(this,arguments);
}

App.prototype.init = function (location){
    location = location || "./books";
    makedirsSync(location);
    process.chdir(location);
    return this;
};

App.prototype.Project = function (url){
    if (typeof url === "string"){
        return new Downloader(url).execute();
    }else if (url instanceof Array){
        var p = new Downloader(url.shift());
        url.forEach(function (u){p.mergeIndexURLs(u)});
        return p.execute();
    }
};

App.prototype.update = function (dir){
    return new Downloader().update(dir);
}

module.exports = App;
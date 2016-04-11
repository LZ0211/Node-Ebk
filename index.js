var fs = require('fs'),
    path = require('path'),
    Collector = require('./lib/Collector');


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
        var p = new Collector(url).start();
    }else if (url instanceof Array){
        var p = this.Project(url.shift());
        url.forEach(function (u){p.merge(u)});
    }
    return p;
};

App.prototype.update = function (dir){
    if (typeof dir === "string"){
        return new Collector().update(dir).start();
    }else if (dir instanceof Array){
        (function (){
            var d = dir.shift();
            var callee = arguments.callee;
            if (d){
                var pro = new Collector;
                pro.update(d).start();
                pro.on("end",callee)
            }
        })()
    }
}

module.exports = App;
var fs = require("fs");
var path = require("path");

var noop = function (){}

exports.makedirsSync = function (dir){
    if (fs.existsSync(dir)){
        return
    }
    var dirname = path.dirname(dir);
    fs.existsSync(dirname) || makedirsSync(dirname);
    fs.mkdirSync(dir);
};

exports.cleardirsSync = function (root){
    if (!fs.existsSync(root)){
        return
    }
    var filestat = fs.statSync(root);
    if (filestat.isDirectory() == true){
        var files = fs.readdirSync(root);
        files.forEach(function (file){
            cleardirsSync(path.join(root,file));
        });
        fs.rmdirSync(root);
    }else {
        fs.unlinkSync(root);
    }
};

exports.walk = function(root, callback){
    (function (root){
        var files = fs.readdirSync(root);
        var stats = {};
        files.forEach(function (file){
            var real = path.join(root,file);
            stats[real] = {};
            var filestat = fs.statSync(real);
            if (filestat.isDirectory() == true){
                stats[real].isDirectory=true;
            }else {
                stats[real].isDirectory=false;
            }
        });
        for (var file in stats){
            var stat = stats[file];
            if (stat.isDirectory){
                arguments.callee(file)
            }else {
                callback(file)
            }
        }
    })(root);
};

exports.autoRetry = function (options){
    var times = 0;
    var maxtimes = options.max || 5;
    var resolve = options.resolve;
    var reject = options.reject || noop;
    var promise = options.promise;
    (function (){
        var callee = arguments.callee;
        promise().then(resolve,function(e){
            ++times < maxtimes ? callee() : reject(e);
        });
    })()
};

exports.autoContinue = function (array,fn,callback){
    callback = callback || noop;
    (function (){
        var item = array.shift();
        item ? fn(item,arguments.callee) : callback()
    })()
}

exports.parallel = function (array,fn,callback,num){
    num = num || 3;
    callback = callback || noop;
    var _called = false;
    var fun = function (){
        var item = array.shift();
        if (item){
            fn(item,fun)
        }else if (!_called){
            _called = true;
            callback();
        }
    }
    while (num){
        fun();
        num -= 1;
    }
}
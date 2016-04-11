var fs = require("fs");
var path = require("path");

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

exports.autoRetry = function (promise,fn){
    (function (){
        var callee = arguments.callee;
        promise.then(fn,function(e){callee()});
    })()
}
exports.autoContinue = function (array,fn){
    (function (){
        var item = array.shift();
        item && fn(item,arguments.callee)
    })()
}

exports.parallel = function (array,fn,num){
    for (var i=0;i<num ;i++ ){
        autoContinue(array,fn)
    }
}
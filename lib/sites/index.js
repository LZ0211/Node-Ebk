// ===== 自定义站点规则 =====
var Sites = [];
var path = require("path");
var fs = require("fs");

function walk(root, callback){
	var callee,
		files,
		real,
		filestat;
	(function (root){
		callee = arguments.callee;
		files = fs.readdirSync(root);
		files.forEach(function (file){
			real = path.join(root,file);
			filestat = fs.statSync(real);
			if (filestat.isDirectory() == true){
				callee(real,callback);
			}
			callback(root,file);
		})
	})(root);
};
walk(path.join(__dirname,"db"),function (root,file){
    var filename = path.relative(__dirname,path.join(root,file));
    if (path.extname(filename).toLowerCase() === ".js"){
        Sites.push(require('./'+filename.replace(".js","")));
    }
});

function toReStr(str) {
    return str.replace(/[()\[\]{}|+.,^$?\\*]/g, "\\$&");
}

Sites.find=function (url){
    for (var i=0;i<this.length ;i++ ){
        if (!this[i].siteURL) continue;
        var reg = new RegExp(toReStr(this[i].siteURL),"ig");
        if (reg.test(url)){
            return this[i];
        }else if (this[i].history){
            var history = this[i].history;
            for (var j=0;j<history.length ;j++){
                reg = new RegExp(toReStr(history[j]),"ig");
                if (reg.test(url)){
                    return this[i];
                }
            }
        }
    }
    return this.auto;
    //console.log('没有找到对应的下载规则，请手动添加规则...');
}
Sites.auto = require('./auto')
/*var json = [];
for (var i=0;i<Sites.length ;i++ ){
    var obj = Sites[i];
    var url = obj.siteURL;
    var selec = (obj.selector.infoPage.cover || "").toString();
    selec = (selec.match(/\$\(['"](.*)?['"]\)/) || {})[1]
    json.push({
        'title':obj.siteName,
        'href':url,
        'select':selec
    })
}
console.log(json)*/
//Sites.forEach(item=>console.log(item.siteName,item.siteURL))
module.exports = Sites;
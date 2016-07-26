var dot = require('../dot');
var Epub = require('JSZip');
var fs = require("fs");
var path = require("path");
var htmlAsync = require("../html/async");
var model = {
    opf:"./model/opf.xml",
    ncx:"./model/ncx.xml",
    container:"./model/container.xml",
    mimetype:"./model/mimetype"
};
var template = {};
(function(){
    for (var name in model){
        var file = model[name];
        model[name] = fs.readFileSync(path.join(__dirname,file)).toString();
    }
    ['opf','ncx'].forEach(function (name){
        var temp = dot.template(model[name]);
        template[name] = function (data){
            return temp(data).replace(/&nbsp;/g,"  ").replace(/&para;/g,"\n");
        }
    });
})()

module.exports = function (book,callback){
    var ebk = new Epub();
    book.use(htmlAsync,function(files){
        var opt = {createFolders:true};
        book = book.toJSON();
        ebk.file('mimetype',model.mimetype,{compression:'STORE'});
        ebk.file('META-INF/container.xml',model.container,opt);
        ebk.file('OEBPS/content.opf',template.opf(book),opt);
        ebk.file('OEBPS/toc.ncx',template.ncx(book),opt);
        ebk.file('OEBPS/css/style.css',files.get('css/style.css'),opt);
        ebk.file("OEBPS/images/cover.jpg", files.get('images/cover.jpg'), {base64: true,createFolders:true});
        ebk.file('OEBPS/coverpage.html',files.get('coverpage.html'),opt);
        book.list.forEach(function (chapter,index){
            //console.log(["正在压缩第",chapter.id,"章 已完成",((index+1)/book.list.length*100).toFixed(2)].join(""));
            var file = chapter.id + '.html';
            ebk.file('OEBPS/' + file,files.get(file),opt);
        });
        callback(ebk.generate({type:"nodebuffer",compression:'DEFLATE'}));
    });
}
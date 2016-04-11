var Parser = require('../lib/Parser');
var request = require('../lib/request');
var ebk = require('../lib/ebook');
var Book = require('../lib/Book');
var App = require('../');
var utils = require('./utils');
var fs = require('fs');
var path = require('path');
var URL = require("url");




//app.Project("http://www.paoshuba.cc/Partlist/52506/").ebook().set("maxThreads",20)

//var array = [].map(function(v){return "http://www.01bz.xyz"+v});

var root = "./books";
var app = new App(root);
try{
    var dataBase = require(root +"/dataBase");
}
catch (e){
    var dataBase = {}
}
process.on("exit",function (){
    for (var dir in dataBase ){
        delete dataBase[dir].cover
    }
    fs.writeFileSync("dataBase.json",JSON.stringify(dataBase,null,4));
})


Batch = {
    eBook:function (){
        var root = "../ebook";
        utils.parallel(Object.keys(dataBase),function (dir,callback){
            console.log(dir)
            Book.load(dir,function (e,book){
                if (e){console.log(e);return}
                var file = book.meta.author + " - " + book.meta.title + ".epub";
                file = path.join(root,file);
                console.log(file)
                fs.writeFile(file,book.use(ebk.epub),function (){
                    callback()
                })
            })
        },null,10)
    },
    downLoad:function (array){
        utils.parallel(array,function (url,callback){
            console.log(url)
            app.Project(url)
                .ebook()
                .set("maxThreads",10)
                .set("changeSource",true)
                .on("end",callback)
                .on("end",function (){
                    if (this.book){
                        dataBase[this.dir] = this.book.meta;
                    }
                })
        },null,5)
    },
    test:function (url){
        Client.getHTML(url).then(function (data){
            Parser.init(data,url)
            console.log(Parser.parseIndexPage())
            console.log(Parser.parseInfoPage())
            console.log(Parser.getBookInfos())
            console.log(Parser.parseContentPage())
            console.log(Parser.getContent())
        });
    },
    Quest:function (from,to,temp){
        return Array(to-from+1).fill(from).map(function (v,i){
            return temp.replace("*",i+v)
        });
    },
    single:function (url){
        app.Project(url)
            .ebook()
            .set("maxThreads",10)
            .set("changeSource",true)
            .on("end",function (){
                if (this.book){
                    dataBase[this.dir] = this.book.meta;
                }
            })
    }
}
console.log()
var array = [];
utils.parallel(Batch.Quest(1,161,"http://www.paoshuba.cc/fenlei/1/*.html"),function (url,callback){
    console.log(url)
    utils.autoRetry({
        promise:function(){return request.get(url)},
        resolve:function (data){
            var $ = Parser.init(data,url).$;
            $(".pic a").each(function (i,v){
                if ($(v).find("img").attr("src") !== "http://www.paoshuba.cc/modules/article/images/nocover.jpg"){
                    console.log($(v).attr("href"))
                    array.push($(v).attr("href"));
                }
            });
            callback();
        },
        reject:callback
    })
},function (){
    fs.writeFile("quest.txt", JSON.stringify(array));
    Batch.downLoad(array);
},3)
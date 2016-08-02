var Downloader = require('./lib/Downloader');
var Parser = require('./lib/Parser');
var DB = require('./lib/DataBase');
var utils = require('./lib/utils');
var request = require('./lib/request');
var URL = require("url");
var fs = require('fs');
var path = require('path');
function noop(){}

function App(root){
    utils.mkdirs(root);
    process.chdir(root);
    var dataBase = new DB("dataBase.json");

    var App = new Downloader();
    App._db = dataBase;
    App.plugin("start",function (url){
        return App.spawn().init(url).dataBase(dataBase).execute();
    });
    App.extend("executes",function (array){
        utils.parallel(array,function (url,next){
            App.start(url).end(next)
        });
        return App;
    });
    App.extend("updates",function (array){
        console.time("update");
        utils.parallel(array,function (dir,next){
            App
            .spawn()
            .update(dir)
            .dataBase(dataBase)
            .end(next)
        },()=>console.timeEnd("update"));
        return App;
    });
    App.extend("batch",function (from,to,temp){
        return Array(to-from+1).fill(from).map(function (v,i){
            return temp.replace("*",i+v)
        });
    });
    App.extend("convertEbooks",function (array,format){
        console.time("update");
        utils.parallel(array,function (dir,next){
            App
            .spawn()
            .convertEbook(dir,format)
            .end(next)
        },()=>console.timeEnd("update"));
        return App;
    });

    App.extend("deepQuest",function (array,selector){
        var Quest = [];
        utils.parallel(array,function (url,next){
            App.getHTMLContent(url,(data)=>{
                var $ = Parser.init(data,url).$;
                $(selector).each((i,v)=>{
                    var href = $(v).attr("href");
                    Quest.push(URL.resolve(url,href));
                });
                next();
            },next);
        },function (){
            App.executes(Quest);
        });
        return App;
    });

    return App;
}

module.exports = App;

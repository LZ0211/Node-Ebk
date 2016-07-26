var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var URL = require('url');
var fs = require('fs');
var lang = require('./lang');
var Sites = require('../sites');
var globalRules = require('./globalRules');
var utils = require('./utils');


function toReStr(str) {// 处理字符串，否则可能会无法用正则替换
    return str.replace(/[()\[\]{}|+.,^$?\\*]/g, "\\$&");
}

function select(input,selector){
    if (utils.isFunction(selector)){
        return selector(input);
    }else if (utils.isArray(selector)){
        for (var i=0;i<selector.length;i++){
            input = select(input,selector[i])
        }
        return input;
    }else{
        return selector;
    }
}

function filt(input,filter){
    if (utils.isFunction(filter)){
        filter(input);
    }
    if (utils.isArray(filter)){
        filter.forEach(filt.bind(null,input));
    }
}
function replace(input,selector){
    if (!utils.isString(input)){
        return String(input)
    }
    if (utils.isString(selector)){
        try{
            var regexp = new RegExp(selector,"ig");
        }catch (e){
            var regexp = new RegExp(toReStr(selector),"ig");
        }
        return replace(input,regexp);
    }
    if (utils.isArray(selector)){
        selector.forEach(function (selec){
            input = replace(input,selec);
        });
        return input;
    }
    if (utils.isRegExp(selector)){
        return input.replace(selector,"");
    }
    if (utils.isObject(selector)){
        Object.keys(selector).forEach(function (k){
            input = input.replace(new RegExp(k,"ig"),selector[k]);
        });
        return input;
    }
    return input;
}

module.exports = (function (){
    var cache;
    var Parser = {};
    Parser.Sites = Sites;
    Parser.init = function (data,url){
        this.location = url || this.location;
        this.rule = Sites.find(this.location) || Sites.auto;
        this.decode(data,this.rule && this.rule.charset);
        this.load(replace(this.doc,this.rule.replacer.doc));
        return this;
    }
    Parser.load = function (doc){
        this.$ = cheerio.load(doc,{decodeEntities: false});
        this.$.location = this.location;
        this.$.doc = doc;
        this.doc = doc;
        cache = {};
        return this;
    }
    Parser.decode = function (data,charset){
        if (utils.isString(data)){
            this.doc = data;
            return this.doc;
        }
        this.doc = iconv.decode(data,charset||"gbk");
        return this.doc;
    }
    Parser.parse = function (name){
        this.rule.filter = this.rule.filter || {};
        var filter = this.rule.filter[name];
        if (filter){
            filt(this.$,filter);
        }
        var rules = this.rule.selector[name];
        var attribs = Object.keys(rules);
        var dict = {};
        for (var i=0;i<attribs.length;i++){
            var attr = attribs[i];
            var selector = rules[attr];
            var replacer = this.rule.replacer[attr];
            var res = select(this.$,selector);
            if (replacer){
                res = replace(res,replacer);
            }
            dict[attr] = res;
        }
        return dict;
    }
    Parser.parseInfoPage = function (){
        if (!cache.infoPage){
            cache.infoPage = this.parse("infoPage");
        }
        return cache.infoPage;
    }
    Parser.parseContentPage = function (){
        if (!cache.contentPage){
            cache.contentPage = this.parse("contentPage");
        }
        return cache.contentPage;
    }
    Parser.parseIndexPage = function (){
        if (!cache.indexPage){
            cache.indexPage = this.parse("indexPage");
        }
        return cache.indexPage;
    }
    Parser.filterFileName = function (name){
        var rep = {"^\\s+":"","\\s+$":"",":":"：","\\?":"？","[*\"<>]*":"","[|\\s]+":"_","(\\\\|\/)+":"-","\\.+$":""};
        return replace(name,rep);
    }
    Parser.getTitle = function (){
        //console.log("开始解析书籍标题...");
        return lang(this.filterFileName(this.parseInfoPage().title));
    }
    Parser.getAuthor = function (){
        //console.log("开始解析书籍作者...");
        return lang(this.filterFileName(this.parseInfoPage().author));
    }
    Parser.getClasses = function (){
        //console.log("开始解析书籍类别...");
        return lang(this.parseInfoPage().classes);
    }
    Parser.getCover = function (){
        //console.log("开始解析书籍封面...");
        return URL.resolve(this.location,this.parseInfoPage().cover || "");
    }
    Parser.getBrief = function (){
        //console.log("开始解析书籍简介...");
        var text = this.parseInfoPage().brief;
        return this.filterContent(text);
    }
    Parser.isEnd = function (){
        //console.log("开始检查书籍是否完结...");
        var regexp = /已?(完成|完结|完本|终章|结局|全本|结束)/
        var text = this.parseInfoPage().isend;
        if (typeof text === "boolean"){
            return text;
        }
        text = lang(text);
        return regexp.test(text);
    };
    Parser.getBookInfos = function(){
        var infos = {};
        infos.title = this.getTitle();
        infos.author = this.getAuthor();
        infos.classes = this.getClasses();
        infos.cover = this.getCover();
        infos.brief = this.getBrief();
        infos.isend = this.isEnd();
        return infos;
    }
    Parser.getIndexUrls = function (){
        //console.log("开始解析下载目录...");
        var urls = this.parseIndexPage().index;
        urls = urls.filter(function(url){return url.href});
        urls.forEach(function (url,index){
            url.text = replace(url.text,this.rule.replacer.indexText);
            url.text = lang(url.text);
            url.href = URL.resolve(this.location,url.href);
            url.href = url.href.replace(/&amp;/g,'&');
            url.id = this.rule.gid ? select(url.href,this.rule.gid) : index+1;
        }.bind(this));
        return urls;
    }
    Parser.getInfoPage = function (){
        return URL.resolve(this.location,this.parseIndexPage().infoURL || this.location);
    }
    Parser.getIndexPage = function (){
        return URL.resolve(this.location,this.parseInfoPage().indexURL || this.location);
    }
    Parser.getContent = function (){
        var content = this.parseContentPage().content;
        var footer = this.parseContentPage().footer;
        if (footer < 1){
            return "";
        }
        return this.filterContent(content);
    }
    Parser.filterContent = function (content){
        if (!content) return content
        var imgs = [];
        content = content.replace(/<img[^<]*\/?>/ig, function(img){
            var matched = img.match(/src="([^\"']+)?"/);
            matched && (img = matched[1]);
            try{
                img = URL.resolve(Parser.location,img)
            }
            catch (e){
                console.log(e);
                console.log(img)
            }            
            imgs.push(img);
            return "{%img=" + (imgs.length - 1) + "%}";
        });
        var links = [];
        content = content.replace(/<a [^<>]*?>(.*)<\/a>/ig, function(link,text){
            var matched = link.match(/href="([^\"'<>]+)?"/);
            matched && (link = matched[1]);
            try{
                link = URL.resolve(Parser.location,link)
            }
            catch (e){
                console.log(e);
                console.log(link)
            }
            links.push([link,text]);
            return "{%link=" + (links.length - 1) + "%}";
        });
        content = replace(content,globalRules.replace);
        content = this.$("<div>"+content+"</div>").text();
        content = replace(content,this.rule.replacer.content);
        content = utils.mergeLines(content);
        content = replace(content,this.rule.replacer.content);
        content = replace(content,globalRules.replaceAll);
        // 还原link
        content = content.replace(/\{%link=(\d+)?%\}/g, function($, $1) {
            return '\n<a href="' + links[$1][0] + '">' + links[$1][1].replace(/<.*?>/g,"") + '</a>';
        });
        // 还原图片
        content = content.replace(/\{%img=(\d+)?%\}/g, function($, $1) {
            return '<img src="' + imgs[$1] + '" />';
        });
        return lang(content);
    }
    return Parser;
})()

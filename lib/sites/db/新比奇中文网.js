module.exports = {
    "siteName":"新比奇中文网",
    "siteURL":"http://www.xiaoshuo2016.com",
    "history":["http://www.xinbiqi.com"],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
            var arr = [];
            $("div.cate-List li").each(function (i,v){
                arr.unshift($(v))
            });
            var list = $("div.cate-List > ul");
            list.empty();
            arr.forEach(function (v){list.append(v)});
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.cate-List a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.introMid h1').text()},
            "author":function($){return $('div.phr > p > span').eq(0).text()},
            "brief":function($){return $('div.intro-detail').html()},
            "cover":function($){return $('.thumbnail img').attr('src')},
            "classes":function($){return $('div.phr > p > span').eq(1).text()},
            "isend":function($){return $('p:contains("最新章节")').text()}
        },
        "contentPage":{
            "content":function($){return $('.articleDiv').html()}
        }
    },
    "replacer":{
        "content":[{"匕匕":"比"},"ｂｉｑｉ．ｍｅ","()","（比奇中文网首发www.biqi.me）","比·奇·小·说·网·首·发○?","http://www.biqi.me比奇中文网永久网址，请牢记！","www.biqi.me比奇中文网一直.*?好友分享！","[\\[｛【].*?(比奇中文|xinbiqi).*?[\\]｝】]","新比奇中文网www.xinbiqi.com ."]
    }
}
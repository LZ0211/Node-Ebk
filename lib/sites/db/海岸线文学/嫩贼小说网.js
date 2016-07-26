module.exports = {
    "siteName":"嫩贼小说网",
    "siteURL":"http://www.nenzei.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.chapterlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $.location.replace("/index","").replace(/xiaoshuo\/\d+\//,"book/")}
        },
        "infoPage":{
            "title":function($){return $('.book-title h1').text()},
            "author":function($){return $('.book-title em').text()},
            "brief":function($){return $('.book-intro').html()},
            "cover":function($){return $('.book-img img').attr('src')},
            "classes":function($){return $('.crumbs a').eq(1).text()},
            "isend":function($){return $('.book-stats').text()}
        },
        "contentPage":{
            "content":function($){return $('#BookText').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":["作者：","&nbsp;.*"]
    }
}
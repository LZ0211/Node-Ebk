module.exports = {
    "siteName":"88读书网",
    "siteURL":"http://www.88dushu.com",
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
            "index":function($){return $('.mulu a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.rt h1').text()},
            "author":function($){return $('.msg em').eq(0).text()},
            "brief":function($){return $('.intro').html()},
            "cover":function($){return $('.lf img').attr('src')},
            "classes":function($){return $('.place a').eq(1).text()},
            "isend":function($){return $('.msg em').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('.yd_text2').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":["作者："," $"]
    }
}
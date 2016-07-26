module.exports = {
    "siteName":"趣阅读",
    "siteURL":"http://www.quyuedu.com",
    "history":[],
    "charset":"utf8",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.clistmain a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $.location.replace(/[^\/]*.html/,'')}
        },
        "infoPage":{
            "title":function($){return $('.info111 h1').text()},
            "author":function($){return $('.info112 a').eq(0).text()},
            "brief":function($){return $('#bookmemoword').html()},
            "cover":function($){return $('.info12 img').attr('src')},
            "classes":function($){return $('.info112 a').eq(1).text()},
            "isend":function($){return $('.info113 i').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return 1},
            "nextPage":function($){return $('#mainIframe').attr('src')}
        }
    },
    "replacer":{
    }
}
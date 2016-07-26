module.exports = {
    "siteName":"笔趣阁",
    "siteURL":"http://www.biquge.tw",
    "history":[],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){$('#content').find("script,div").remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('meta[property="og:title"]').attr("content")},
            "author":function($){return $('meta[property="og:novel:author"]').attr("content")},
            "brief":function($){return $('meta[property="og:description"]').attr("content")},
            "cover":function($){return $('#fmimg img').attr('src')},
            "classes":function($){return $('meta[property="og:novel:category"]').attr("content")},
            "isend":function($){return $('meta[property="og:novel:status"]').attr("content")}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "content":["readx\\(\\);","（百度搜索更新最快最稳定\\)"]
    }
}
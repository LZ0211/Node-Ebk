module.exports = {
    "siteName":"奇书网",
    "siteURL":"http://www.xqtxt.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){$('#content').find("script,div").remove()},
        "indexPage":function ($){
            $('#list dt').eq(1).prevAll().remove();
        }
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
    }
}
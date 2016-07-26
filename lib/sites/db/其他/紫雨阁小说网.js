module.exports = {
    "siteName":"紫雨阁小说网",
    "siteURL":"http://www.ziyuge.com",
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
            "index":function($){return $('#FreeDiv a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr("href")}
        },
        "infoPage":{
            "title":function($){return $('span.h5').text()},
            "author":function($){return $('span.txtblue').text()},
            "brief":function($){return $('#detail2 p').html()},
            "cover":function($){return $('.abcon_left01_left img').attr('src')},
            "classes":function($){return $('.aboutbook_site a').eq(1).text()},
            "isend":function($){return $('.lianz_img').length ? "连载" : "完本"}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.copyright').length}
        }
    },
    "replacer":{
    }
}
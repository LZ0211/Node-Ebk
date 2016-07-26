module.exports = {
    "siteName":"潇湘书院",
    "siteURL":"http://www.xxsy.net",
    "history":[],
    "charset":"utf8",
    "deep":true,
    "filter":{
        "indexPage":function($){$('span.vip').parent('li').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#catalog_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('#ccon_load a').last().attr("href")}
        },
        "infoPage":{
            "title":function($){return $('#detail_title h1').text()},
            "author":function($){return $('#detail_title h1').find('span').text()},
            "brief":function($){return $('#summary1').html()},
            "cover":function($){return $('#cover img').attr('src')},
            "classes":function($){return $('.infolist li').eq(2).text()},
            "isend":function($){return $('.infolist li').eq(4).text()},
        },
        "contentPage":{
            "content":function($){return $('#zjcontentdiv').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "title":"文 / .*",
        "author":["文 / ","\\s"],
        "brief":"内容介绍：",
        "isend":"写作进度：",
        "classes":"类别题材：",
        "content":"本书由潇湘书院首发，请勿转载！"
    }
}
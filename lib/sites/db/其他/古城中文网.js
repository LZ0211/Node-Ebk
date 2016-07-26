module.exports = {
    "siteName":"古城中文网",
    "siteURL":"http://www.gcwang.net",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('script').remove();
            $('.width div').not('.divimage').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.list li').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.show-img a').eq(0).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.wright h1').text()},
            "author":function($){return $('.wright h1').next().text()},
            "brief":function($){return $('.xsqianyan p').html()},
            "cover":function($){return $('.bortable img').attr('src')},
            "classes":function($){return $('.winfo a').eq(0).text()},
            "isend":function($){return $('#lzico').length ? "连载" : "完结"}
        },
        "contentPage":{
            "content":function($){return $('.gcwang13.width').html()},
            "footer":function($){return $('.show-kwords').length}
        }
    },
    "replacer":{
        "title":["全文阅读.*","\\s"],
        "author":"作者：",
    }
}
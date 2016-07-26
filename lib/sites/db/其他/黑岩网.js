module.exports = {
    "siteName":"黑岩网",
    "siteURL":"http://www.heiyan.co",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#htmlContent').find('div').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.mulu_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.status h1').text()},
            "author":function($){return $('.author a').text()},
            "brief":function($){return $('.jianjie').html()},
            "cover":function($){return $('.imgbox img').attr('src')},
            "classes":function($){return $('.status p').eq(1).find('a').text()},
            "isend":function($){return $('.serial').text()}
        },
        "contentPage":{
            "content":function($){return $('#htmlContent').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
    }
}
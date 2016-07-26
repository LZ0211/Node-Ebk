module.exports = {
    "siteName":"百川电子书",
    "siteURL":"http://www.bcdzs.com",
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
            "index":function($){return $('.playlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.titleDiv h1').text()},
            "author":function($){return $('.titleDiv a').text()},
            "brief":function($){return $('#xxinfo').html()},
            "cover":function($){return $('.imgdiv img').attr('src')},
            "classes":function($){return $('.infodiv .item').eq(0).text()},
            "isend":function($){return $('.infodiv .item').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "classes":["类型：","&nbsp;"]
    }
}
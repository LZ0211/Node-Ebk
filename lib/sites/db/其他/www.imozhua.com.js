module.exports = {
    "siteName":"魔爪",
    "siteURL":"http://www.imozhua.com",
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
            "index":function($){return $('.chapterNum a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('#info h1').text()},
            "author":function($){return $('.info-r li').text()},
            "brief":function($){return $('#waa').html()},
            "cover":function($){return $('.mr11 img').attr('src')},
            "classes":function($){return $('.info-r li').text()},
            "isend":function($){return $('.info-r li').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
    }
}
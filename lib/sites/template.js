module.exports = {
    "siteName":"",
    "siteURL":"",
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
            "title":function($){return $('.main-index a').text()},
            "author":function($){return $('.info-r li').text()},
            "brief":function($){return $('#waa').html()},
            "cover":function($){return $('.mr11 img').attr('src')},
            "classes":function($){return $('.info-r li').text()},
            "isend":function($){return $('.info-r li').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()}
        }
    },
    "replacer":{
    }
}
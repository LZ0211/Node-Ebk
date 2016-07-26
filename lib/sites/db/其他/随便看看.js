module.exports = {
    "siteName":"随便看看",
    "siteURL":"http://www.sbkk8.cn",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#f_article script').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.leftList a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.myPlace a').eq(-1).text()},
            "author":function($){return $('.myPlace a').eq(1).text()},
            "brief":function($){return $('.des').html()},
            "cover":function($){return $('.ablum img').attr('src')},
            "classes":function($){return $('.myPlace a').eq(1).text()},
            "isend":true
        },
        "contentPage":{
            "content":function($){return $('#f_article').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
    }
}
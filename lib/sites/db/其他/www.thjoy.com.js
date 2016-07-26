module.exports = {
    "siteName":"桃花小说网",
    "siteURL":"http://www.thjoy.com",
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
            "index":function($){return $('.listbox a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.cont h2').text()},
            "author":function($){return $('.view span').eq(0).text()},
            "brief":function($){return $('.contbox').html()},
            "cover":function($){return $('.topcont img').attr('src')},
            "classes":function($){return $('.view span').eq(1).text()},
            "isend":function($){return $('.inseries').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "brief":['<strong>简介：<\\/strong>','.*最新章节:.*']
    }
}
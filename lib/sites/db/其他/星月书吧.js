module.exports = {
    "siteName":"星月书吧",
    "siteURL":"http://www.xyshu8.com",
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
            "index":function($){return $('#BookText > ul > li > a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('#breadCrumb a').eq(1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#info h1').text()},
            "author":function($){return $('#info > h1 > span > a').eq(0).text()},
            "brief":function($){return $('#info > h3 > p').html()},
            "cover":function($){return $('.img img').attr('src')},
            "classes":function($){return $('.info a').text()},
            "isend":function($){return $('.txt .ny').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "title":["《","》.*"]
    }
}
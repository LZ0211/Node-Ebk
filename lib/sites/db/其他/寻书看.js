module.exports = {
    "siteName":"寻书看",
    "siteURL":"http://www.xunshukan.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('.novel_content').find('div,script,a').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.list_box a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.LinkPath_Novel').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.h1title').text()},
            "author":function($){return $('.h1title').next().find('a').text()},
            "brief":function($){return $('#articledesc').html()},
            "cover":function($){return $('.sy_nr02_left img').attr('src')},
            "classes":function($){return $('.LinkPath_Class').text()},
            "isend":function($){return $('#lzico').length ? "连载" : "完结"}
        },
        "contentPage":{
            "content":function($){return $('.novel_content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
    }
}
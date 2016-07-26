module.exports = {
    "siteName":"2k小说网",
    "siteURL":"http://www.2kxs.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('.Text').find('div,script,strong,font,a').remove();
        },
        "indexPage":function ($){
            $('.book').find('h3').first().parent('dt').prevAll().remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.book a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('#crumb a').eq(1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#title a').eq(0).text()},
            "author":function($){return $('#title a').eq(1).text()},
            "brief":function($){return $('p.Text').html()},
            "cover":function($){return $('.bortable img').attr('src')},
            "classes":function($){return $('.winfo span').eq(0).text()},
            "isend":function($){return $('#wjico').length ? "完结" : "连载"}
        },
        "contentPage":{
            "content":function($){return $('.Text').html()},
            "footer":function($){return $('#copyRight').length}
        }
    },
    "replacer":{
        "content":["2k小说阅读网"]
    }
}
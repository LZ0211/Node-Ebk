module.exports = {
    "siteName":"52燃文小说网",
    "siteURL":"http://www.52ranwen.net",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){
            $('.booklist dt').remove();
            $('.booklist a').eq(-1).remove();
            $('.booklist a').eq(-1).remove();
            $('.booklist a').eq(-1).remove();
        },
        "contentPage":function($){
            $('.read-content div').remove();
            $('.read-content p').eq(-1).remove();
        },
        "infoPage":function($){
            $('.intro a').each(function (i,v){
                $(v).replaceWith($(v).text());
            });
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.booklist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.guidebox a').eq(-2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.title h1').text()},
            "author":function($){return $('.author').text()},
            "brief":function($){return $('.intro').html()},
            "cover":function($){return $('.img img').attr('src')},
            "classes":function($){return $('.info span').eq(0).text()},
            "isend":function($){return $('.wjico').length ? "完结" : "连载"}
        },
        "contentPage":{
            "content":function($){return $('.read-content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作者：",
        "classes":"作品类别：",
        "content":["wwW.wenxueMI.coM","wenxuemi.com","[Ｗｗ][Ｅｅ][Ｎ][Ｘｘ][Ｕｕ][Ｅｅ][Ｍｍ][Ｉｉ]。[Ｃｃ][Ｏｏ][Ｍｍ]"]
    }
}
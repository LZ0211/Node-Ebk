module.exports = {
    "siteName":"雅文言情小说",
    "siteURL":"http://www.yawen8.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $("#content").find("a,font,script").remove();
            $('#content div').not('.divimage').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('#info h1').text()},
            "author":function($){return $('#info p').eq(0).text()},
            "brief":function($){return $('#intro p').first().html()},
            "cover":function($){return $('#fmimg img').attr('src')},
            "classes":function($){return $('.con_top a').eq(1).text()},
            "isend":function($){return $('#info p').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作&nbsp;&nbsp;&nbsp;&nbsp;者：",
        "isend":["状&nbsp;&nbsp;&nbsp;&nbsp;态：",",  .*"],
        "content":["『雅.{0,2}文.{0,2}言.{0,2}情.{0,2}首.{0,2}发』","(凑字){2,}","www.yawen8.com请使用访问本站。","。『雅文言情小说吧』"]
    }
}
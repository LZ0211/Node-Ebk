module.exports = {
    "siteName":"龙腾小说网",
    "siteURL":"http://www.51xsw.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $("#booktext").find("a,font,script,center").remove();
            $('#booktext div').not('.divimage').remove();
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
            "brief":function($){return $('#list p').html()},
            "cover":function($){return $('#fmimg img').attr('src')},
            "classes":function($){return $('.con_top a').eq(-2).text()},
            "isend":function($){return $('#info p').text()}
        },
        "contentPage":{
            "content":function($){return $('#booktext').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作&nbsp;&nbsp;&nbsp;&nbsp;者：",
    }
}
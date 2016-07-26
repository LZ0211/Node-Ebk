module.exports = {
    "siteName":"零点看书",
    "siteURL":"http://www.00ksw.com",
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
            "brief":function($){return $('#intro p').eq(0).html()},
            "cover":function($){return $('#fmimg img').attr('src')},
            "classes":function($){return $('.con_top a').eq(-1).text()},
            "isend":function($){return $('#info p').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作&nbsp;&nbsp;&nbsp;&nbsp;者：",
    }
}
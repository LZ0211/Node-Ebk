module.exports = {
    "siteName":"56书库",
    "siteURL":"http://www.56shuku.org",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$("#content > div").remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.dccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('ul.bread-crumbs a').eq(1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1.f20h').text()},
            "author":function($){return $('h1.f20h em').text()},
            "brief":function($){return $('.intro').html()},
            "cover":function($){return $('.pic img').attr('src')},
            "classes":function($){return $('tr[valign="top"]').find('td').eq(0).text()},
            "isend":function($){return $('tr[valign="top"]').find('td').eq(2).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#thumb').length}
        }
    },
    "replacer":{
        "title":"作者:.*",
        "author":"作者:",
        "classes":"小说分类：",
        "isend":"小说状态："
    }
}
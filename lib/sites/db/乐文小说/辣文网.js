module.exports = {
    "siteName":"辣文网",
    "siteURL":"http://www.lawen5.com",
    "history":["http://www.lawenw.com"],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$("#content").find("a,table").remove()},
        "infoPage":function($){$(".intro a").remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.dccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("TXT全本下载")').attr('href')}
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
        "title":"作者：.*",
        "author":"作者：",
        "classes":"小说分类：",
        "brief":["【】","&nbsp;"],
        "isend":"小说状态：",
        "content":"辣文网"
    }
}
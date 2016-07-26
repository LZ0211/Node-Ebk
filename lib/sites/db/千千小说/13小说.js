module.exports = {
    "siteName":"13小说",
    "siteURL":"http://www.13xs.com",
    "history":["http://www.qqxs.cc"],
    "charset":"gbk",
    "search":"http://zhannei.baidu.com/cse/search?s=14385258656228148903&q=[[word]]&isNeedCheckDomain=1&jump=1",
    "filter":{
        "contentPage":function($){$('#booktext > div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('div.con_top > a').eq(1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1.f21h').text()},
            "author":function($){return $('h1.f21h > em').text()},
            "brief":function($){return $('div.intro').text()},
            "cover":function($){return $('div.pic > img').attr('src')},
            "classes":function($){return $('div.box_info > table > tbody > tr').eq(4).find('td').eq(0).text()},
            "isend":function($){return $('div.play-content > p > a').eq(0).text()}
        },
        "contentPage":{
            "content":function($){return $('#booktext').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "title":"作者:.*",
        "author":".*作者:",
        "brief":"&nbsp;",
        "classes":"小说分类："
    }
}
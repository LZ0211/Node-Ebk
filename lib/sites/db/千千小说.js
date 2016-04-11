module.exports = {
    "siteName":"千千小说",
    "siteURL":"http://www.qqbad.com",
    "history":[],
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
            "author":function($){return $('div.pic > ul > li').eq(2).text()},
            "brief":function($){return $('div.intro').text()},
            "cover":function($){return $('div.pic > img').attr('src')},
            "classes":function($){return $('div.pic > ul > li').eq(0).text()},
            "isend":function($){return $('div.pic > ul > li').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#booktext').html()}
        }
    },
    "replacer":{
        "title":"最新章节",
        "author":"作者：",
        "isend":"状态：",
        "classes":"分类："
    }
}
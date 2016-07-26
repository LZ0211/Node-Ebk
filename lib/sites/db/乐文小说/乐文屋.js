module.exports = {
    "siteName":"乐文屋",
    "siteURL":"http://www.lewenwu.com",
    "history":["http://www.365xs.org"],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$("#content").find("div,script,a").remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.chapterlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
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
            "footer":function($){return $('.botm').length}
        }
    },
    "replacer":{
        "doc":["（求收藏.{0,5}）","（求收藏）","（已修改，求收藏）","（求首订）","（求订阅）",{"--!>":"-->"},{"[\\(（【][^<>\\(\\)（）【】]{2,15}[）\\)】]<\\/a>":"</a>"},{"(\\d+章\\s+)\\d+":"$1"}],
        "title":"作者：.*",
        "author":"作者：",
        "classes":"小说分类：",
        "isend":"小说状态："
    }
}
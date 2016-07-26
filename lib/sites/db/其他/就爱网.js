module.exports = {
    "siteName":"就爱网",
    "siteURL":"http://www.92txt.net",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.ccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.your_position a').eq(1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.hottext').eq(0).text()},
            "author":function($){return $('#content td').eq(0).find('td').eq(4).text()},
            "brief":function($){return $('#content img').parent('td').html()},
            "cover":function($){return $('#content img').attr('src')},
            "classes":function($){return $('#content td').eq(0).find('td').eq(3).text()},
            "isend":function($){return $('#content td').eq(0).find('td').eq(7).text()}
        },
        "contentPage":{
            "content":function($){return $('#chapter_content').html()},
            "footer":function($){return $('#annote').length}
        }
    },
    "replacer":{
        "title":"最近章节：",
        "author":"作&nbsp;&nbsp;&nbsp; 者：",
        "classes":"类&nbsp;&nbsp;&nbsp; 别：",
        "brief":["[\\s\\S]*?内容简介：","作品关键字：[\\s\\S]*"],
        "content":["\\(www.92txt.net 就爱网\\)"]
    }
}
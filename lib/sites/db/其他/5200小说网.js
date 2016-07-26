module.exports = {
    "siteName":"5200小说网",
    "siteURL":"http://www.3zm.net",
    "history":[],
    "charset":"gbk",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('td.ccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href');}
        },
        "infoPage":{
            "title":function($){return $('.wright h1').text()},
            "author":function($){return $('.wright em').text()},
            "brief":function($){return $('.wright p').html()},
            "cover":function($){return $('.wleft img').attr('src')},
            "classes":function($){return $('.winfo span').eq(0).text()},
            "isend":function($){return $('#lzico').length ? "连载" : "完结"}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#footlink').length}
        }
    },
    "replacer":{
        "title":"TXT下载[\\s\\S]*",
        "author":"作者：",
        "classes":"分类："
    }
}
module.exports = {
    "siteName":"下载楼",
    "siteURL":"http://www.xiazailou.co",
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
            "index":function($){return $('.TabCss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function ($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.grid td').eq(1).text()},
            "author":function($){return $('.grid td').eq(4).text()},
            "brief":function($){return $('.jianjie').html()},
            "cover":function($){return $('.grid img').attr('src')},
            "classes":function($){return $('.grid td').eq(3).text()},
            "isend":function($){return $('.grid td').eq(8).text()}
        },
        "contentPage":{
            "content":function($){return $('#chapter_content').html()},
            "footer":function($){return $('#annote').length}
        }
    },
    "replacer":{
        "author": "作&nbsp;&nbsp;&nbsp; 者：",
        "classes": "类&nbsp;&nbsp;&nbsp; 别：",
        "brief":["下载楼\\(www.xiazailou.co\\)为您奉献.*","[\\s\\S]*?xiazailou.co"],
        "content":["【手机看小说.*】"]
    }
}
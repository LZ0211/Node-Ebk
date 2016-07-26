module.exports = {
    "siteName":"猪猪岛小说网",
    "siteURL":"http://www.zhuzhudao.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function ($){
            $("a:contains('猪猪岛小说重要公告')").remove();
        },
        "contentPage":function ($){
            $("a").each(function (i,v){
                $(v).replaceWith($(v).text());
            });
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('div.celue a').eq(2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.book_title h1').text()},
            "author":function($){return $('.book_title').text()},
            "brief":function($){return $('.intro').html()},
            "cover":function($){return $('.book_img img').attr('src')},
            "classes":function($){return $('.book_txt > ul > li').eq(1).find('a').text()},
            "isend":function($){return $('.book_txt > ul > li').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('div.content').html()},
            "footer":function($){return $('.foot').length}
        }
    },
    "replacer":{
        "author":".*?作者：",
        "isend":".*?状态：",
        "content":["[\\u0021-\\u002f,\\u003a-\\u0040,\\u005b-\\u0060,\\u007b-\\u007e,\\uFF3b-\\uFF40,\\u3007-\\u301c,\\uff1c-\\uff1f,\\uff5b-\\uff5e,—,\\uff01-\\uff0f]{0,2}猪.{0,2}猪.{0,2}岛.{0,2}小.{0,2}说.{0,4}ww?w?.*?com","小.{0,2}说.{0,4}ww?w?.*?com"]
    }
}
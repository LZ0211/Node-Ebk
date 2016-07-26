module.exports = {
    "siteName":"新书在线",
    "siteURL":"http://www.xinshu.in",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('div.box_box script').remove();
            $('.box_box a').each(function (i,v){
                $(v).replaceWith($(v).text());
            });
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.list_box a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.title h2').text()},
            "author":function($){return $('div.info a').eq(0).text()},
            "brief":function($){return $('div.words').text()},
            "cover":function($){return $('div.pic img').attr('src')},
            "classes":function($){return $('div.info a').eq(1).text()},
            "isend":function($){return $('li.wj').text()}
        },
        "contentPage":{
            "content":function($){return $('div.box_box').html()},
            "footer":function($){return $('.floatBox').length}
        }
    },
    "replacer":{
        "isend":"状态：",
        "brief":"[\\s\\S]*?简介：",
        "content":[
            "【本小说发自.*",
            "\"\\);",
            " ?\\('",
            "'\\) -- The CHM[\\s\\S]*"
        ]
    }
}
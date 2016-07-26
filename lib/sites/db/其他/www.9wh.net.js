module.exports = {
    "siteName":"九头鸟书院",
    "siteURL":"http://www.9wh.net",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
            $('.ListRow').eq(-1).remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.ListRow a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function ($){return $('.TextGuide a').eq(-2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#content h1').text()},
            "author":function($){return $('td[width="25%"]').eq(1).text()},
            "brief":function($){return $('.hottext').parent('td').html()},
            "cover":function($){return $('.hottext').parent('td').find('img').attr('src')},
            "classes":function($){return $('td[width="25%"]').eq(0).text()},
            "isend":function($){return $('#content td').text()}
        },
        "contentPage":{
            "content":function($){return $('#text_area').html()},
            "footer":function($){return $('#site_notice').length}
        }
    },
    "replacer":{
        "title":"TXT免费下载",
        "author":"作&nbsp;&nbsp;&nbsp; 者：",
        "classes":"类&nbsp;&nbsp;&nbsp; 别：",
        "brief":["[\\s\\S]*?内容简介：","&lt;\\/br&gt;各位书友要是觉得.*"],
        "content":["\\(九头鸟书院.*?\\)"]
    }
}
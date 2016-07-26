module.exports = {
    "siteName":"黑龙小说网",
    "siteURL":"http://www.hlxiaoshuo.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#content').find('div,h1').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.TabCss > dl > dd > a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.booktitle li').text()},
            "author":function($){return $('.booktext li').eq(11).text()},
            "brief":function($){return $('.booksum').html()},
            "cover":function($){return $('.bookimg img').attr('src')},
            "classes":function($){return $('.booktext li').eq(1).text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#copyRight').length}
        }
    },
    "replacer":{
    }
}
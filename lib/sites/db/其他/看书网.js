module.exports = {
    "siteName":"看书网",
    "siteURL":"http://www.kanshu.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
            $('li:contains("[VIP]")').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.mulu_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.weizhi a').eq(-2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.title_h1 h1').text()},
            "author":function($){return $('.xx_zz span').first().text()},
            "brief":function($){return $('#articledesc').html()},
            "cover":function($){return $('.xx_left1 img').attr('src')},
            "classes":function($){return $('.xx_xinx span').first().text()},
            "isend":function($){return $('.xx_xinx span').eq(2).text()},
            "tags":function($){return $('.xx_biaoqian a').map(function(i,v){return $(v).text()}).toArray()}
        },
        "contentPage":{
            "content":function($){return $('.yd_text2').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "content":'<span id="avg_link"><\\/span>[\\s\\S]*'
    }
}
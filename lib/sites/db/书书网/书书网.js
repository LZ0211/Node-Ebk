module.exports = {
    "siteName":"书书网",
    "siteURL":"http://shushu.com.cn",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#content').find('script,div').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.clearfix a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.crumbswrap a').eq(-2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.r420 h1').text()},
            "author":function($){return $('.author a').first().text()},
            "brief":function($){return $('.r_cons').html()},
            "cover":function($){return $('.con_limg img').attr('src')},
            "classes":function($){return $('.crumbswrap a').eq(1).text()},
            "isend":function($){return $('.ywjico').length ? "已完结" : "连载中"}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
    }
}
module.exports = {
    "siteName":"书楼网",
    "siteURL":"http://www.shulou.cc",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('#content').find('div,script,a').remove()},
        "indexPage":function($){$('#readerlist > div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#readerlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function ($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.booktitle h1').eq(0).text()},
            "author":function($){return $('#author a').text()},
            "brief":function($){return $('#bookintro').text()},
            "cover":function($){return $('#bookimg img').attr('src')},
            "classes":function($){return $('#count span').eq(0).text()},
            "isend":function($){return $('#count span').eq(-1).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
    }
}
module.exports = {
    "siteName":"三易文学",
    "siteURL":"http://www.31wxw.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#content').find('div,a,iframe').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#readerlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.booktitle h1').text()},
            "author":function($){return $('#author').text()},
            "brief":function($){return $('#bookintro').html()},
            "cover":function($){return $('#bookimg img').attr('src')},
            "classes":function($){return $('#count span').eq(0).text()},
            "isend":function($){return $('#count span').eq(5).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":"作者：",
        "title":["《","》"],
        "brief":"【作品简介】： "
    }
}
module.exports = {
    "siteName":"聚书阁",
    "siteURL":"http://www.jushuge.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('#content a').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#readerlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('div.tabstit a').last().attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.bookright h1').text()},
            "author":function($){return $('#author > a').text()},
            "brief":function($){return $('#bookintro').text()},
            "cover":function($){return $('#bookimg img').attr('src')},
            "classes":function($){return $('#count > span').eq(0).text()},
            "isend":function($){return $('#count > span').eq(5).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()}
        }
    },
    "replacer":{
        "content":["\\[www.jushuge.com 超多好看小说\\]","\\[看本书请到.*?\\]"]
    }
}
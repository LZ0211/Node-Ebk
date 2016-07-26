module.exports = {
    "siteName":"151小说网",
    "siteURL":"http://www.quanbenba.com",
    "history":[],
    "charset":"gbk",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.readerListShow a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1').text()},
            "author":function($){return $('h1 a').text()},
            "brief":function($){return $('#wrap').text()},
            "cover":function($){return $('div.pic > img').attr('src')},
            "classes":function($){return $('p.left strong').first().text()},
            "isend":function($){return $('p.left strong').eq(3).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "title":["作者：.*","&nbsp;"],
        "author":["作者：","\\s"],
        "brief":" "
    }
}
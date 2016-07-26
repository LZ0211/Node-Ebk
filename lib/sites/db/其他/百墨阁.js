module.exports = {
    "siteName":"百墨阁",
    "siteURL":"http://www.baimoge.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('#htmlContent div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('dl.chapter-list > dd > a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.title-info h1').text()},
            "author":function($){return $('.title-info').text()},
            "brief":function($){return $('p.info-text').html()},
            "cover":function($){return $('.f-left img').attr('src')},
            "classes":function($){return $('.type-info a').text()},
            "isend":function($){return $('.fullflag-1').length ? "完本" : "连载"}
        },
        "contentPage":{
            "content":function($){return $('#htmlContent').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":["\\s",".*?作者：","阅读：.*"]
    }
}
module.exports = {
    "siteName":"去读读",
    "siteURL":"http://www.qududu.net",
    "history":[],
    "charset":"gbk",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#kui-book-show a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('div.kui-left.kui-fs32').text()},
            "author":function($){return $('div.kui-gray').text()},
            "brief":function($){return $('div.kui-mt15.kui-fs12').html()},
            "cover":function($){return $('div.kui-left img').attr('src')},
            "classes":function($){return $('div.kui-gray').text()},
            "isend":function($){return $('#adbanner_1').text()}
        },
        "contentPage":{
            "content":function($){return $('#kui-page-read-txt').html()},
            "footer":function($){return $('.kui-inner').length}
        }
    },
    "replacer":{
        "author":[".*?作者：","类别：.*","\\s"],
        "classes":[".*?类别：","状态：.*"],
        "isend":" / .*",
        "content":{"<\\/?p(\\S+)":"$1"}
    }
}
module.exports = {
    "siteName":"应天全本",
    "siteURL":"http://www.txt77.cc",
    "history":[],
    "charset":"utf8",
    "filter":{
        "indexPage":function($){$('a:contains("全本下载")').remove()},
        "contentPage":function($){$('#content a').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('.contentlist a').map(function (i,v){
                    return {href:$(v).attr('href'),text:$(v).text()};
                }).toArray();
            },
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.name > h1').text()},
            "author":function($){return $('.name > a').text()},
            "brief":function($){return $('.cont').eq(1).text()},
            "cover":function($){return $('.pic_box > img').attr('src')},
            "classes":function($){return $('#downrefresh').next().find('a').text()},
            "isend":function($){return $('#downrefresh').next().next().find('strong').text()}
        },
        "contentPage":{
            "content":function($){return $('#showcontent').text()}
        }
    },
    "replacer":{
        "title":"最新章节",
        "author":"TXT下载",
        "classes":[".*类&nbsp;别："," /&nbsp;TXT下载","载入中..."," "],
        "brief":"介绍：",
        "content":["&lt;script.*script&gt;"]
    }
}
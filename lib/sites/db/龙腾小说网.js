module.exports = {
    "siteName":"龙腾小说网",
    "siteURL":"http://www.longteng22.com",
    "history":["http://www.longteng2.net"],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){$('ul.ListRow').last().remove()},
        "contentPage":function($){$('#content a').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('.ListRow > li > a').map(function (i,v){
                    return {href:$(v).attr('href'),text:$(v).text()};
                }).toArray();
            },
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.BookTitle').text()},
            "author":function($){return $('.BookAuthor > a').text()},
            "brief":function($){return $('.BookIntro').text()},
            "cover":function($){return $('.BookImg').attr('src')},
            "classes":function($){return $('.BookAuthor').text()},
            "isend":function($){return $('.ListCon').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()}
        }
    },
    "replacer":{
        "title":"最新章节",
        "author":"TXT下载",
        "classes":[".*类&nbsp;别："," /&nbsp;TXT下载","载入中..."," "],
        "brief":"介绍：",
        "content":["##聚书&gt;阁,\\n?"]
    }
}
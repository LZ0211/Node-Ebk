module.exports = {
    "siteName":"17K女频网",
    "siteURL":"http://mm.17k.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "indexPage":function($){$('li:contains("VIP")').remove()},
        "contentPage":function($){$('#chapterContentWapper').find('div,style').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.Volume a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.infoPath a').last().attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.Info h1').text()},
            "author":function($){return $('.author').find('a.name').text()},
            "brief":function($){return $('.cont a').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.infoPath a').eq(-2).text()},
            "isend":function($){return $('.label').text()}
        },
        "contentPage":{
            "content":function($){return $('#chapterContentWapper').html()},
            "footer":function($){return $('.Footer').length}
        }
    },
    "replacer":{
        "isend":"\\s",
        "content":"本书首发来自17K小说网，第一时间看正版内容！"
    }
}
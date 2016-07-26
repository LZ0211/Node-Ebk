module.exports = {
    "siteName":"17K小说网",
    "siteURL":"http://www.17k.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "indexPage":function($){$('li:contains("VIP")').remove()},
        "contentPage":function($){$('#chapterContentWapper').find('div,style').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.con a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.infoPath a').last().attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1').find('font[itemprop="name"]').text()},
            "author":function($){return $('span[itemprop="author"]').find('font[itemprop="name"]').text()},
            "brief":function($){return $('font[itemprop="description"]').html()},
            "cover":function($){return $('img[itemprop="image"]').attr('src')},
            "classes":function($){return $('font[itemprop="genre"]').text()},
            "tags":function($){return $('.tab a').map((i,v)=>$(v).text()).toArray()},
            "isend":function($){return $('div.sqbox').text()}
        },
        "contentPage":{
            "content":function($){return $('#chapterContentWapper').html()},
            "footer":function($){return $('Footer').length}
        }
    },
    "replacer":{
        "isend":"\\s",
        "content":"本书首发来自17K小说网，第一时间看正版内容！"
    }
}
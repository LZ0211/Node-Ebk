module.exports = {
    "siteName":"起点中文",
    "siteURL":"http://read.qidian.com",
    "history":["http://www.qidian.com"],
    "charset":"utf8",
    "deep":true,
    "filter":{
        "contentPage":function($){$('#chaptercontent').find('script[type="text/javascript"]').remove()},
        "indexPage":function($){$('.box_title:contains("VIP章节")').next().remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.list > ul').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).find('span').text()})).toArray()},
            "infoURL":function($){return $('#bookUrl').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1[itemprop="name"]').text()},
            "author":function($){return $('span[itemprop="author"]').text()},
            "brief":function($){return $('span[itemprop="description"]').text()},
            "cover":function($){return $('img[itemprop="image"]').attr('src')},
            "classes":function($){return $('span[itemprop="genre"]').text()},
            "isend":function($){return $('span[itemprop="updataStatus"]').text()}
        },
        "contentPage":{
            "content":function($){return $('#chaptercontent').text()},
            "nextPage":function($){return $('#chaptercontent script').attr('src')}
        }
    },
    "replacer":{
        "title":"\\s",
        "author":"\\s"
    }
}
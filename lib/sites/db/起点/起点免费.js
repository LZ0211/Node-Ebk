module.exports = {
    "siteName":"起点免费",
    "siteURL":"http://free.qidian.com",
    "history":[],
    "charset":"utf8",
    "deep":true,
    "filter":{
        "contentPage":function($){$('#content div').remove()},
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.section a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.top_navi a').eq(2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1[itemprop="name"]').text()},
            "author":function($){return $('span[itemprop="author"]').text()},
            "brief":function($){return $('span[itemprop="description"]').html()},
            "cover":function($){return $('img[itemprop="image"]').attr('src')},
            "classes":function($){return $('span[itemprop="genre"]').text()},
            "isend":function($){return $('span[itemprop="updataStatus"]').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').text()},
            "footer":function($){return 1},
            "nextPage":function($){return $('#content script').attr('src')}
        }
    },
    "replacer":{
        "title":"\\s",
        "author":"\\s"
    }
}
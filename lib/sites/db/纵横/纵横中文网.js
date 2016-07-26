module.exports = {
    "siteName":"纵横中文网",
    "siteURL":"http://book.zongheng.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){$('#chaptercontent').find('script[type="text/javascript"]').remove()},
        "indexPage":function($){$('.box_title:contains("VIP章节")').next().remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('td[chapterlevel="0"]').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('span.nav a').last().attr('href')}
        },
        "infoPage":{
            "title":function($){return $('div.status > h1 > a').text()},
            "author":function($){return $('div.booksub > a').first().text()},
            "brief":function($){return $('div.info_con').text()},
            "cover":function($){return $('div.book_cover img').attr('src')},
            "classes":function($){return $('div.booksub > a').eq(1).text()},
            "keyword":function($){return $('.keyword a').map((i,v)=>$(v).text()).toArray()},
            "isend":function($){return ($('span.end').length ? "已完结" : "连载中")}
        },
        "contentPage":{
            "content":function($){return $('#chapterContent').html()},
            "footer":function($){return $('.foot').length}
        }
    },
    "replacer":{
    }
}
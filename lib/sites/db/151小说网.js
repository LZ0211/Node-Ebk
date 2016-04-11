module.exports = {
    "siteName":"151小说网",
    "siteURL":"http://www.151xs.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "indexPage":function($){$('dd[style="width:33%;"]').remove()},
        "contentPage":function($){$('div.content').find('div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.listcon a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('div.con_top > a').eq(1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1.f21h').text()},
            "author":function($){return $('div.divauthor').text()},
            "brief":function($){return $('div.intro').text()},
            "cover":function($){return $('div.pic > img').attr('src')},
            "classes":function($){return $('a.shouye').text()},
            "isend":function($){return $('p.play-list').text()}
        },
        "contentPage":{
            "content":function($){return $('div.content').html()}
        }
    },
    "replacer":{
        "title":"\\s",
        "author":["作者：","\\s"],
        "brief":" "
    }
}
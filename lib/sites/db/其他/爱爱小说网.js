module.exports = {
    "siteName":"爱爱小说网",
    "siteURL":"http://www.iixs.org",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('.chapter_info').next('div').find('div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#chapterlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('h1').text()},
            "author":function($){return $('h3 a').text()},
            "brief":function($){return $('#intro p').html()},
            "cover":function($){return $('.img img').attr('src')},
            "classes":function($){return $('.place > .sg > a').eq(1).text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('.chapter_info').next('div').html()},
            "footer":function($){return $('.prev_next').length}
        }
    },
    "replacer":{
    }
}
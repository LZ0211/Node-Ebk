module.exports = {
    "siteName":"逐浪小说",
    "siteURL":"http://book.zhulang.com",
    "history":["http://www.zhulang.com"],
    "charset":"utf8",
    "deep":true,
    "filter":{
        "indexPage":function($){$('a:contains("vip")').remove()},
        "contentPage":function($){$('#read-content p').find('cite,a').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.chapter-list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.crumbs > strong > a').attr("href")}
        },
        "infoPage":{
            "title":function($){return $('.cover-tit h2').text()},
            "author":function($){return $('.cover-tit h2').find('span').text()},
            "brief":function($){return $('p.summ-part').html()},
            "cover":function($){return $('.cover-box-left img').attr('src')},
            "classes":function($){return $('.cover-tit p').find('span').eq(0).text()},
            "isend":"",
        },
        "contentPage":{
            "content":function($){return $('#read-content p').html()},
            "footer":function($){return $('.read-mask').length}
        }
    },
    "replacer":{
        "title":["作者：.*","\\s"],
        "author":"作者：",
        "classes":"类别："
    }
}
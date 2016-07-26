module.exports = {
    "siteName":"全本小说网",
    "siteURL":"http://www.tstxt.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){
            $('#content h1').remove();
        },
        "indexPage":function ($){
            $('li:contains("全文阅读")').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.chapterNum ul').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.main-index a').last().text()},
            "author":function($){return $('.info-r li').eq(2).text()},
            "brief":function($){return $('#waa').html()},
            "cover":function($){return $('.mr11 img').attr('src')},
            "classes":function($){return $('.info-r li').eq(0).text()},
            "isend":function($){return $('.info-r li').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('footer').length}
        }
    },
    "replacer":{
        "title":"txt下载",
        "author":"作者：",
        "classes":"类别：",
        "isend":"状态："
    }
}
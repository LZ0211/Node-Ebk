module.exports = {
    "siteName":"无用小说网",
    "siteURL":"http://www.7cct.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('.vcontent div').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                var array = [];
                $('.booklist a').each(function (i,v){
                    var href = $(v).attr('href');
                    var text = $(v).text();
                    if (href && text){
                        array.push({
                            href:href,
                            text:text
                        });
                    }
                });
                return array;
            },
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('meta[property="og:novel:book_name"]').attr("content")},
            "author":function($){return $('meta[property="og:novel:author"]').attr("content")},
            "brief":function($){return $('meta[property="og:description"]').attr("content")},
            "cover":function($){return $('meta[property="og:image"]').attr("content")},
            "classes":function($){return $('meta[property="og:novel:category"]').attr("content")},
            "isend":function($){return $('meta[property="og:novel:status"]').attr("content")}
        },
        "contentPage":{
            "content":function($){return $('.vcontent').html()},
            "footer":function($){return $('.footer').length},
            "nextPage":function($){return $('#pagelink strong').next('a').attr('href')}
        }
    },
    "replacer":{
        "content":["［本章未完，请点击下一页继续阅读！］","［本章结束］"]
    }
}
module.exports = {
    "siteName":"龙坛书网",
    "siteURL":"http://ebook.s-dragon.org/forum/archiver/",
    "history":[],
    "charset":"big5",
    "deep": true,
    "gid":function(url){return url.match(/tid-(\d+)/)[1]},
    "filter":{
        "contentPage":function ($){
            var $posts=$('div.archiver_postbody'),main=$posts.first(),html='';
            $posts.each(function(c,a){a=$(a);if(5E2<a.text().length)html+=a.html()});
            main.html(html);
            $('.archiver_postbody > h2').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('.archiver_threadlist a').map(function (i,v){
                    return {
                        href:$(v).attr('href').replace('archiver/',''),
                        text:$(v).text()}
                }).toArray()
            },
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('h1 > a').text()},
            "author":"龙坛书网",
            "brief":function($){return $('h1 > a').text()},
            "cover":"http://images.17173.com/2011/news/2011/07/27/allan0727ccc_05.jpg",
            "classes":function($){return $('h1 > a').text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('div.archiver_postbody').eq(0).html()},
            "footer":function($){return $('#copyright').length},
            "nextPage":function($){return ($('.archiver_pages strong').next().attr('href') || '').replace('archiver/','')}
        }
    },
    "replacer":{
        "title":"查看完整版本: ",
        "brief":"查看完整版本: ",
        "classes":"查看完整版本: ",
        "content":["\\[\\/?(font|size|b|color|i|align|url|image).*?\\]","\\[<i> .*?\\]"]
    }
}
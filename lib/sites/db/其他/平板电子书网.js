module.exports = {
    "siteName":"平板电子书网",
    "siteURL":"http://www.pbtxt.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
             $('.content').find('div,a').remove();
        },
        "infoPage":function ($){
            $('.info-text p').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('.list dl')
                    .find('a')
                    .map(function(i,v){
                        return {
                            href:$(v).attr('href'),
                            text:$(v).text()
                        }
                    })
                    .toArray()
                    .sort(function(a,b){
                        return a.href.replace('.html','') - b.href.replace('.html','')
                    })
            },
            "infoURL":function ($){return $('.crumbs a').eq(-1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.title h1').text()},
            "author":function($){return $('#author').text()},
            "brief":function($){return $('.info-text').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.crumbs a').eq(-1).text()},
            "isend":function($){return $('.fullflag li').text()}
        },
        "contentPage":{
            "content":function($){return $('.content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":" \\/ 作者：",
        "content":["(77nt.com 千千小说网)","77nt.Com千千小说网全文阅读","八零电子书\\/","92Ks.Com文阅读","热门小说","全文阅读","77[NnTt]+.[CcOoMm]+千千小说网","\\(\\)","（）","小说\\/","(本章由77nt.Com更新)"]
    }
}
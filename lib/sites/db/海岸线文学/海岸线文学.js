module.exports = {
    "siteName":"海岸线文学",
    "siteURL":"http://www.haxsk.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){$('a:contains("点击这里")').remove()},
        "contentPage":function($){
            $('#contentsea3c div').not('.divimage').remove();
            $('#contentsea3c span').remove();
            $('#contentsea3c font').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('table.acss a').map(function (i,v){
                    return {
                        href:$(v).attr('href'),
                        text:$(v).text()
                    };
                }).toArray().sort(function(a,b){
                    return (a.href > b.href ? 1 : -1)
                });
            },
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function ($){return $('.book-title > h1').text()},
            "author":function ($){return $('.book-title > em').text()},
            "brief":function ($){return $('p.book-intro').html()},
            "cover":function ($){return $('.book-img img').attr('src')},
            "classes":function ($){return $('div.crumbs > a').eq(1).text()},
            "isend":function ($){return $('p.book-stats').text()}
        },
        "contentPage":{
            "content":function ($){return $('#contentsea3c').html()},
            "footer":function($){return $('.footborder').length}
        }
    },
    "replacer":{
        "author":["作者：",".*全文阅读,"],
        "isend":[".*?状态：","字数：.*","\\s","&nbsp;"]
    }
}
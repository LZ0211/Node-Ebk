module.exports = {
    "siteName":"笔下文学",
    "siteURL":"http://www.bxwx8.org",
    "history":["http://www.bxwx.org"],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('#content div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('div.TabCss a').map(function (i,v){
                    return {href:$(v).attr('href'),text:$(v).text()};
                }).toArray().sort(function(a,b){
                    return (a.href > b.href ? 1 : -1)
                });
            },
            "infoURL":function ($){return $('div.toproad > ul a').attr('href')}
        },
        "infoPage":{
            "title":function ($){return $('td > font > strong').text()},
            "author":function ($){return $('td[width="16%"] a').eq(1).text()},
            "brief":function ($){return $('div[align="left"]').html()},
            "cover":function ($){return $('img.picborder').attr('src')},
            "classes":function ($){return $('#centerm a').eq(1).text()},
            "isend":false
        },
        "contentPage":{
            "content":function ($){return $('#content').html()},
            "footer":function($){return $('#footlink').length}
        }
    },
    "replacer":{
        "title":"全集下载",
        "brief":["([wW\\.]+)?[bB][xX][wW][xX].[Oo][Rr][Gg]","&nbsp;"]
    }
}
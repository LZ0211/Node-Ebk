module.exports = {
    "siteName":"趣读屋",
    "siteURL":"http://www.qvduwu.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){$('a:contains("点击这里")').remove()},
        "contentPage":function($){
            $('#BookText div').not('.divimage').remove();
            $('#BookText span').remove();
            $('#BookText font').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('.chapterlist a').map(function (i,v){
                    return {
                        href:$(v).attr('href'),
                        text:$(v).text()
                    };
                }).toArray();
            },
            "infoURL":function($){return $('a:contains("txt全集下载")').attr('href')}
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
            "content":function ($){return $('#BookText').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":"作者：",
        "isend":[".*?状态：","字数：.*","\\s","&nbsp;"]
    }
}
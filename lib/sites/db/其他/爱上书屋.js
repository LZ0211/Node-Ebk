module.exports = {
    "siteName":"爱上书屋",
    "siteURL":"http://www.23sw.net",
    "history":[],
    "charset":"gbk",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.book_article_texttable a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.book_news_style_text2 h1').text()},
            "author":function($){return $('.book_news_style_text2 h2').eq(0).text()},
            "brief":function($){return $('.msgarea p').html()},
            "cover":function($){return $('.book_news_style_img1 img').attr('src')},
            "classes":function($){return $('.con_top a').eq(-1).text()},
            "isend":function($){return $('.book_news_style_text2 h3').text()}
        },
        "contentPage":{
            "content":function($){return $('#booktext').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作者：",
    }
}
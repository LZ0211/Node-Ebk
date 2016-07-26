module.exports = {
    "siteName":"顶点小说",
    "siteURL":"http://www.23us.cc",
    "history":[],
    "charset":"utf8",
    "filter":{
        "indexPage":function($){$('a:contains("点击这里")').remove()},
        "contentPage":function($){
            $('#content div').not('.divimage').remove();
            $('#content span').remove();
            $('#content font').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":$=>$('dl.chapterlist a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray(),
            "infoURL":$=>$('a:contains("TXT下载")').attr('href')
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
            "content":$=>$('#content').html(),
            "footer":$=>$('#footer').length
        }
    },
    "replacer":{
        "author":["作者：",".*全文阅读,"],
        "isend":[".*?状态：","字数：.*","\\s","&nbsp;"]
    }
}


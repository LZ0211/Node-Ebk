module.exports = {
    "siteName":"顶点小说",
    "siteURL":"http://www.23us.so",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){$('td:contains("更新重要通告")').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('td.L a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#content h1').text()},
            "author":function($){return $('div.fl tr').first().text()},
            "brief":function($){return $('#sidename').prev('p').html()},
            "cover":function($){return $('a.hst img').attr('src')},
            "classes":function($){return $('div.fl tr').first().text()},
            "isend":function($){return $('div.fl tr').first().text()}
        },
        "contentPage":{
            "content":function($){return $('#contents').html()},
            "footer":function($){return $('#contfoot').length}
        }
    },
    "replacer":{
        "title":["全文阅读","\\s"],
        "author":[".*?小说作者","小说状态.*","\\s","&nbsp;"],
        "classes":[".*?小说类别","小说作者.*","\\s","&nbsp;"],
        "isend":[".*?小说状态","\\s","&nbsp;"],
        "brief":["&nbsp;"],
        "indexText":["〔文〕","（.{1,3}更.*?）","（求收藏求推荐求点击）"],
        "content":"看最快更新"
    }
}
module.exports = {
    "siteName":"顶点小说网",
    "siteURL":"http://www.23wx.com",
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
            "content":function($){return $('#contents').html()}
        }
    },
    "replacer":{
        "title":["全文阅读","\\s"],
        "author":[".*?文章作者","文章状态.*","\\s","&nbsp;"],
        "classes":[".*?文章类别","文章作者.*","\\s","&nbsp;"],
        "isend":[".*?文章状态","\\s","&nbsp;"],
        "brief":["&nbsp;"],
        "content":"看最快更新"
    }
}
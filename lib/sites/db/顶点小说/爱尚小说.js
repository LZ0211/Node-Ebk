module.exports = {
    "siteName":"爱尚小说",
    "siteURL":"http://www.23xs.cc",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){$('td:contains("更新重要通告")').remove()},
        "contentPage":function($){$('#contents').find('a,script,div,p').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('td.L a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('p.fr').parent('dt').find('a').eq(-1).attr('href')}
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
            "footer":function($){return $('#footlink').length}
        }
    },
    "replacer":{
        "title":["全文阅读","\\s"],
        "author":["[\\s\\S]*?小说作者","小说状态[\\s\\S]*","\\s","&nbsp;"],
        "classes":["[\\s\\S]*?小说类别","小说作者[\\s\\S]*","\\s","&nbsp;"],
        "isend":["[\\s\\S]*?小说状态","\\s","&nbsp;"],
        "brief":["&nbsp;"],
        "indexText":["〔文〕","（.{1,3}更.*?）"],
        "content":["看最快更新","一秒记住.*?免费阅读！"]
    }
}
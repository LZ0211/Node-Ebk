module.exports = {
    "siteName":"书迷楼",
    "siteURL":"http://www.shumilou.co",
    "history":["http://www.shumilou.com"],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){$('#content').find('*').not('p').remove()},
        "indexPage":function($){$('.list').last().remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('ul > li > a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('div.tit > b').eq(0).text()},
            "author":function($){return $('div.list').text()},
            "brief":function($){return $('div.list').text()},
            "cover":function($){return $('div.content img').attr('src')},
            "classes":function($){return $('div.list').text()},
            "isend":function($){return $('div.list').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.bottom').length}
        }
    },
    "replacer":{
        "author":["状态:[\\s\\S]*","[\\s\\S]*作者:","^\\s*|\\s*$"],
        "isend":["分类:[\\s\\S]*","[\\s\\S]*状态:","^\\s*|\\s*$"],
        "classes":["简介:[\\s\\S]*","[\\s\\S]*分类:","^\\s*|\\s*$"],
        "brief":["分享到：[\\s\\S]*","[\\s\\S]*简介:","^\\s*|\\s*$"],
        "content":{"&nbsp;":"","[\\n\\r\\t]+":"\n","^\\s*|\\s*$":""}
    }
}
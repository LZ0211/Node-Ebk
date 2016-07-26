module.exports = {
    "siteName":"我去读",
    "siteURL":"http://www.woqudu.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.ccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('td >font > span').text()},
            "author":function($){return $('td >font > span').parent('font').next().text()},
            "brief":function($){return $('.hottext').parent('td').html()},
            "cover":function($){return $('.hottext').parent('td').find('img').attr('src')},
            "classes":function($){return $.html().match(/类别：<\/b>([^&<>]*)?&/)[1]},
            "isend":function($){return $.html().match(/文章状态：([^&<>]*)?&/)[1]}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#footlink').length}
        }
    },
    "replacer":{
        "brief":['[\\s\\S]*?内容简介','作品关键字：[\\s\\S]*'],
        "title":"&nbsp;",
    }
}
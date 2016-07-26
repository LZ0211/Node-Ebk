module.exports = {
    "siteName":"大众小说网",
    "siteURL":"http://www.dzxsw.la",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
            $('.List2013').find('ul').eq(0).remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.List2013 a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.title a').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.title h1').text()},
            "author":function($){return $('.information a').eq(0).text()},
            "brief":function($){return $('#cintro').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.head a').eq(2).text()},
            "isend":function($){return $('.information .item').eq(0).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.local').length}
        }
    },
    "replacer":{
        "title":["《","》"],
        "brief":"内容简介："
    }
}
module.exports = {
    "siteName":"随梦小说网",
    "siteURL":"http://www.kkwx.net",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $("#content").find("a,font").remove();
            $('#content div').not('.divimage').remove();
        },
        "indexPage":function ($){
        },
        "infoPage":function ($){
            $("#intro > p").last().remove();
            $("#intro > p").first().remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('#info h1').text()},
            "author":function($){return $('#info p').first().text()},
            "brief":function($){return $('#intro').html()},
            "cover":function($){return $('#fmimg img').attr('src')},
            "classes":function($){return $('#info p').eq(1).text()},
            "isend":function($){return $('p:contains("最新章节")').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()}
        }
    },
    "replacer":{
        "author":["&nbsp;","作者："],
        "classes":["&nbsp;","类别："]
    }
}
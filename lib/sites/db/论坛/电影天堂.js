module.exports = {
    "siteName":"电影天堂",
    "siteURL":"http://www.dy2018.com",
    "history":[],
    "charset":"gbk",
    "gid":function(url){return url.split('/').pop().replace(".html","")},
    "filter":{
        "contentPage":function($){
            $("script,iframe").remove();
            $("div.position").find("span").each(function(i,v){
                $(v).after("<br>");
            });
            $("a").each(function(i,v){
                if($(v).attr("href").match(/^\/\d+\/$/)){
                    $(v).replaceWith($(v).text());
                }
            });
        },
        "indexPage":function ($){
            $("a.ulink").each(function(i,v){
                if($(v).text().match(/\[(最新电影|综合电影)\]/)){
                    $(v).remove();
                }
            })
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('a.ulink').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":"电影天堂",
            "author":"电影天堂",
            "brief":"电影天堂",
            "cover":"http://www.dy2018.com/images/logo.gif",
            "classes":"电影",
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('div.co_content8').html()},
            "footer":function($){return $('.bd6').length}
        }
    },
    "replacer":{
        "content":["请把下载地址.*?欢迎你每天来"]
    }
}
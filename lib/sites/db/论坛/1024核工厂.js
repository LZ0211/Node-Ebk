module.exports = {
    "siteName":"xp303",
    "siteURL":"http://km.1024ky.futbol",
    "history":["http://dtt.1024hgc.club","http://keet.dididown.net","http://1024.xp303.pw","http://1024.hegongchang.kim"],
    "charset":"utf8",
    "gid":function(url){
        return url.split("/")
            .pop()
            .replace(".html","")
            .replace("read.php?tid=","")
            .replace(/&.*/,"")
    },
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
            $('tr:contains("普通主题")').prevAll().remove()
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('tr > td > h3 > a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('th.h > a').text()},
            "author":"1024核工厂",
            "brief":function($){return $('th.h > a').text()},
            "cover":"http://image.hnol.net/c/2016-03/13/13/201603131308166381-2089977.jpg",
            "classes":function($){return $('th.h > a').text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('#read_tpc').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
    }
}
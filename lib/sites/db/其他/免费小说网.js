module.exports = {
    "siteName":"免费小说网",
    "siteURL":"http://www.freexs.cn",
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
            "index":function($){return $('.readout table').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr("href")}
        },
        "infoPage":{
            "title":function($){return $('.readout h1').text()},
            "author":function($){return $('.xiangxi li').eq(0).text()},
            "brief":function($){return $('.xiangxi').html()},
            "cover":function($){return $('.tu img').attr('src')},
            "classes":function($){return $('.xiangxi li').eq(1).text()},
            "isend":function($){return $('.xiangxi li').eq(3).text()}
        },
        "contentPage":{
            "content":function($){return $('.shuneirong').html()},
            "footer":function($){return $('#newfootlink').length}
        }
    },
    "replacer":{
        "title":["《","》"],
        "author":"作者 ：",
        "classes":"作品类型：",
        "brief":["[\\s\\S]*?<strong>书籍简介：<\\/strong>","<strong>最新章节<\\/strong>[\\S\\s]*"],
        "isend":"作品状态："
    }
}
module.exports = {
    "siteName":"19楼书包网",
    "siteURL":"http://www.19lou.tw",
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
            "index":function($){return $('#BookText a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('#SelectRight a').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('td > h1').text()},
            "author":function($){return $('.picborder').parent('td').next('td').find('td').eq(11).text()},
            "brief":function($){return $('#CrbsSum').html()},
            "cover":function($){return $('img.picborder').attr('src')},
            "classes":function($){return $('.picborder').parent('td').next('td').find('td').eq(1).text()},
            "isend":function($){return $('.picborder').parent('td').next('td').find('td').eq(3).text()}
        },
        "contentPage":{
            "content":function($){return $('#booktext').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "title":["《","》"],
        "brief":"【作品简介】： "
    }
}
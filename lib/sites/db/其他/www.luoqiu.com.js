module.exports = {
    "siteName":"落秋中文",
    "siteURL":"http://www.luoqiu.com",
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
            "index":$=>$('.dccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray(),
            "infoURL":$=>$.location.replace(/read\/(\d+)\//,"book/$1.html")
        },
        "infoPage":{
            "title":$=>$('td h1').text(),
            "author":$=>$('td a.green_12').text(),
            "brief":$=>$('#CrbsSum').html(),
            "cover":$=>$('img.picborder').attr('src'),
            "classes":$=>$('img.picborder').parent("td").next().find("td").eq(1).text(),
            "isend":$=>$("#lzico").length ? "连载":"完结"
        },
        "contentPage":{
            "content":$=>$('#content').html(),
            "footer":$=>$('.corner_down_l_1').length
        }
    },
    "replacer":{
        "title":["《","》"],
        "brief":["【作品简介】："]
    }
}
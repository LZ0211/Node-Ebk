module.exports = {
    "siteName":"燃文",
    "siteURL":"http://www.773buy.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#content').find('div').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.dccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('td > h1').text()},
            "author":function($){return $('.picborder').parent('td').next('td').find('td').eq(11).text()},
            "brief":function($){return $('#CrbsSum').html()},
            "cover":function($){return $('.picborder').attr('src')},
            "classes":function($){return $('.picborder').parent('td').next('td').find('td').eq(1).text()},
            "isend":function($){return $('#wjico').length ? "完结":"连载"}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#stats').length}
        }
    },
    "replacer":{
        "content":["免费提供小说.*?欢本书的话请按ctr1d收藏本站"],
        "title":["《","》"],
        "brief":"【作品简介】： "
    }
}
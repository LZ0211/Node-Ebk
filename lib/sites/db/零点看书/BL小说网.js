module.exports = {
    "siteName":"BL小说网",
    "siteURL":"http://www.bl5.cc",
    "history":[],
    "charset":"gbk",
    "search":"http://zhannei.baidu.com/cse/search?s=11325480925228548106&q=[[word]]&isNeedCheckDomain=1&jump=1",
    "filter":{
        "indexPage":function($){
            $('#list p').remove();
            $('#list dt').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('#list a').map(function (i,v){
                    return {href:$(v).attr('href'),text:$(v).text()};
                }).toArray();
            },
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('#info > h1').text()},
            "author":function($){return $('#info p').eq(0).text()},
            "brief":function($){return $('#intro > p').html()},
            "cover":function($){return $('#fmimg > img').attr('src')},
            "classes":function($){return $('#info p').eq(2).text()},
            "isend":function($){return $('#info p').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作者：",
        "classes":"类型：",
        "isend":"状态：",
        "brief":{"&nbsp;":"\n","各位书友要是觉得.*?推荐哦！":""},
        "content":["请记住本站地址.*","更新更快小说.*"]
    }
}
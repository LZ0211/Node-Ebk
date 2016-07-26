module.exports = {
    "siteName":"求书网",
    "siteURL":"http://www.qiushu.cc",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#content div').remove();
        },
        "indexPage":function ($){
        },
        "infoPage":function ($){
            $('#con_ph1_1').find('em,a').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.booklist').next('.book_con_list').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.nowplace a').eq(-1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.tit1 h1').text()},
            "author":function($){return $('.tit1 span').eq(0).text()},
            "brief":function($){return $('#con_ph1_1').html()},
            "cover":function($){return $('.book_img img').attr('src')},
            "classes":function($){return $('#con_ph1_2 td').eq(0).text()},
            "isend":function($){return $('#con_ph1_2 td').eq(2).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('.copyright').length}
        }
    },
    "replacer":{
        "author":"小说作者：",
        "classes":"作品大类："
    }
}
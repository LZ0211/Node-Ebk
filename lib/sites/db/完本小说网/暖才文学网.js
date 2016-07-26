module.exports = {
    "siteName":"暖才文学网",
    "siteURL":"http://www.ncwx.hk",
    "history":["http://www.ncwx.la"],
    "charset":"gbk",
    "filter":{
        "infoPage":function($){
            $("#description1 > strong").remove();
        },
        "indexPage":function ($){
            $("div.novel_list").last().remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.novel_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#content h1').text()},
            "author":function($){return $('.novel_msg a').first().text()},
            "brief":function($){return $('#description1').html()},
            "cover":function($){return $('div.novel_img img').attr('src')},
            "classes":function($){return $('.novel_msg li').eq(3).text()},
            "isend":function($){return $('.novel_msg li').eq(2).find('em').text()}
        },
        "contentPage":{
            "content":function($){return $('div.novel_content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "classes":"类型：",
        "brief":"&nbsp;",
        "content":"【 暖才文学.*?看书更方便。】"
    }
}
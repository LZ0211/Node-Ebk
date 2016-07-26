module.exports = {
    "siteName":"新笔下文学",
    "siteURL":"http://www.bxwx.cc",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('.novel_content').find('div').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.novel_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.novel_nav a').eq(2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#content h1').text()},
            "author":function($){return $('.novel_msg a').eq(0).text()},
            "brief":function($){return $('#description1').html()},
            "cover":function($){return $('.novel_img img').attr('src')},
            "classes":function($){return $('.novel_msg li').eq(3).text()},
            "isend":function($){return $('.novel_msg em').eq(0).text()}
        },
        "contentPage":{
            "content":function($){return $('.novel_content').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "title":["《","》"],
        "classes":"类型：",
        "brief":"<strong>书籍简介</strong>：",
        "content":["[《<\\/\\\［\\[\\(（【\\{]+.{0,18}[ＢBｂb][ＸXｘx][ＷWｗw][ＸXｘx].{0,18}[》>\\/\\\］\\]\\)）】\\}]"]
    }
}
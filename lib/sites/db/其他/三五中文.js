module.exports = {
    "siteName":"三五中文",
    "siteURL":"http://www.555zw.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#content').find('div,script,a').remove();
        },
        "indexPage":function ($){
            $('#xs555').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.ccss a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回封面")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#title a').eq(0).text()},
            "author":function($){return $('#title a').eq(1).text()},
            "brief":function($){return $('.rightDiv').children().eq(5).html()},
            "cover":function($){return $('.picborder').attr('src')},
            "classes":function($){return $('#col1 td').eq(4).text()},
            "isend":function($){return $('#col1 td').eq(9).text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()},
            "footer":function($){return $('#copyright').length}
        }
    },
    "replacer":{
        "content":["\\[记住网址.*?三五中文网\\]"],
        "classes":"本书类别："
    }
}
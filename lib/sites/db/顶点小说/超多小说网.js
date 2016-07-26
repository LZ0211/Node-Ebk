module.exports = {
    "siteName":"超多小说网",
    "siteURL":"http://www.seecd.net",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#contents').find('div,a,script').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){
                var array = [];
                $('.L a').each(function (i,v){
                    var href = $(v).attr('href');
                    var text = $(v).text();
                    if (href && text){
                        array.push({
                            href:href,
                            text:text
                        });
                    }
                });
                return array;
            },
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#content h1').text()},
            "author":function($){return $('#at td').eq(2).text()},
            "brief":function($){return $('.pl').next('p').html()},
            "cover":function($){return $('.hst img').attr('src')},
            "classes":function($){return  $('#at td').eq(0).text()},
            "isend":function($){return  $('#at td').eq(4).text()}
        },
        "contentPage":{
            "content":function($){return $('#contents').html()},
            "footer":function($){return $('#contfoot').length}
        }
    },
    "replacer":{
        "title":" 全文阅读",
        "author":"&nbsp;",
        "classes":"&nbsp;",
        "isend":"&nbsp;"
    }
}
module.exports = {
    "siteName":"天天中文",
    "siteURL":"http://www.day66.com",
    "history":[],
    "charset":"gbk",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){
                var array = [];
                $('.ml_main a').each(function (i,v){
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
            "title":function($){return $('.info_t h1').text()},
            "author":function($){return $('.author').text()},
            "brief":function($){return $('.bookintro').html()},
            "cover":function($){return $('.fengmian img').attr("src")},
            "classes":function($){return $('.info_m span').eq(0).text()},
            "isend":function($){return $('.state').text()}
        },
        "contentPage":{
            "content":function($){return $('.yd_text2').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":"作者：",
        "classes":"类别："
    }
}
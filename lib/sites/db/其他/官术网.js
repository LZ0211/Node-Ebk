module.exports = {
    "siteName":"官术网",
    "siteURL":"http://www.3dllc.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){$('.zhang-txt-nei-rong').find('div,script').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){
                var array = [];
                $('.pox a').each(function (i,v){
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
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.mltit h1').text()},
            "author":function($){return $('.auths').text()},
            "brief":function($){return $('.u-bx p').html()},
            "cover":function($){return $('.umg img').attr("src")},
            "classes":function($){return $('.v-nav p').eq(0).text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('.zhang-txt-nei-rong').html()},
            "footer":function($){return $('.foot').length}
        }
    },
    "replacer":{
        "title":"最新章节",
        "author":"作者：",
        "classes":[".*?> ",">.*"],
        "indexText":["\\(文\\)","（.{1,3}更.*?）"]
    }
}
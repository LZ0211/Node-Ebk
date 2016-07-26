module.exports = {
    "siteName":"妖妖小精",
    "siteURL":"http://www.yyxiaojing.com",
    "history":[],
    "charset":"utf8",
    "gid":function(url){return url.split('/').pop().replace('.html','')},
    "filter":{
        "contentPage":function($){
            $('#art_content img').each(function(i,v){
                $(v).attr("src",$(v).attr("data-original"));
            });
            $('#art_content small').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('table a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('ol > li > a > strong').text()},
            "author":'妖妖小精',
            "brief":function($){return $('ol > li > a > strong').text()},
            "cover":'http://www.lungtan.com/data/attachment/common/a5/common_37_banner.jpg',
            "classes":function($){return $('ol > li > a > strong').text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('#art_content').html()},
            "footer":function($){return $('footer').length}
        }
    },
    "replacer":{
    }
}
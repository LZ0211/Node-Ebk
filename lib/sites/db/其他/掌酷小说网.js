module.exports = {
    "siteName":"掌酷小说网",
    "siteURL":"http://www.zk228.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('.note').find('script,a').remove();
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.txtbox-item a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.hd a').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.p-title').text()},
            "author":function($){return $('.rtext > h5 > a').text()},
            "brief":function($){return $('.desc').html()},
            "cover":function($){return $('.pic img').attr('src')},
            "classes":function($){return $('.info a').eq(0).text()},
            "isend":function($){return $('.ico img').attr('alt')}
        },
        "contentPage":{
            "content":function($){return $('.note').html()},
            "footer":function($){return $('.page-bottom').length}
        }
    },
    "replacer":{
    }
}
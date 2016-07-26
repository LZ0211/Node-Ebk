module.exports = {
    "siteName":"龙腾小说网",
    "siteURL":"http://www.ltxshuo.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#htmlContent').find('a,script').remove();
        },
        "indexPage":function ($){
            $('#htmlList dl').eq(0).remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#htmlList a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('#htmldhshuming a').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#info h1').text()},
            "author":function($){return $('h1.22evfs a').text()},
            "brief":function($){return $('#htmljiashao').html()},
            "cover":function($){return $('.img img').attr('src')},
            "classes":function($){return $('.txt b').eq(3).text()},
            "isend":function($){return $('.txt b').eq(0).text()}
        },
        "contentPage":{
            "content":function($){return $('#htmlContent').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "title":[".*《","》.*","\\s"],
        "isend":"写作状态:",
        "author":"本书作者:",
        "classes":"作品类别:",
        "content":["（龙腾小说网.*保存收藏.*"]
    }
}
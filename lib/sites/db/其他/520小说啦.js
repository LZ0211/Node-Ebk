module.exports = {
    "siteName":"520小说啦",
    "siteURL":"http://www.520xs.la",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$("#adright").remove()},
        "indexPage":function ($){
        },
        "infoPage":function ($){$('.intro strong').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){
                return $('.list > dl >dd > a')
                    .map(function(i,v){
                        return {
                            href:$(v).attr('href'),
                            text:$(v).text()
                        }
                    })
                    .toArray()
                    .sort(function(a,b){
                        return a.href > b.href ? 1:-1
                    })
            },
            "infoURL":function($){return $('.crumbs a').eq(-1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.title h1').text()},
            "author":function($){return $('#author').text()},
            "brief":function($){return $('.info-text').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.crumbs a').eq(1).text()},
            "isend":function($){return $('.fullflag').text()}
        },
        "contentPage":{
            "content":function($){return $('.con_txt').html()},
            "footer":function($){return $('#footer').length}
        }
    },
    "replacer":{
        "author":".*?作者：",
        "brief":['.*?类小说....','<p id="same_author">.*']
    }
}
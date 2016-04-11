module.exports = {
    "siteName":"文心阁",
    "siteURL":"http://www.wenxg.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "indexPage":function($){
            $('.chapterNum h1').eq(1).prevAll('li').remove();
            $('.chapterNum h1').find('a').remove();
        },
        "contentPage":function($){$('#content div').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.chapterNum ul').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.b-info h1').text()},
            "author":function($){return $('.bookso a').text()},
            "brief":function($){return $('#waa').text()},
            "cover":function($){return $('.mr11 img').attr('src')},
            "classes":function($){return $('.bookDetail > dl').first().find('dd').text()},
            "isend":function($){return $('.bookDetail > dl').eq(1).find('dd').text()}
        },
        "contentPage":{
            "content":function($){return $('#content').html()}
        }
    },
    "replacer":{
        "author":"\\s",
        "brief":"介绍:"
    }
}
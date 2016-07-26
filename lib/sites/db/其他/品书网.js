module.exports = {
    "siteName":"品书网",
    "siteURL":"http://www.vodtw.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('#BookText').find('div').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.insert_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.bookname h1').text()},
            "author":function($){return $('.bookdata li').eq(0).text()},
            "brief":function($){return $('.bookintro').html()},
            "cover":function($){return $('.bookpic img').attr('src')},
            "classes":function($){return $('.src a').eq(-2).text()},
            "isend":function($){return $('.bookdata li').eq(1).text()}
        },
        "contentPage":{
            "content":function($){return $('#BookText').html()},
            "footer":function($){return $('.papgbutton').length}
        }
    },
    "replacer":{
        "author":"作    者：",
        "isend":"状    态：",
        "brief":{"    ":"\n"},
        "content":["看首发无广告请到[\\s\\S]*","本书来自[\\s\\S]*"]
    }
}
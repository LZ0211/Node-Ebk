module.exports = {
    "siteName":"ABC小说网",
    "siteURL":"http://www.bookabc.net",
    "history":["http://124.248.239.100:59288"],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){
        },
        "indexPage":function ($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.chapter-list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.bookinfo h1').text()},
            "author":function($){return $('.bookinfo .i1').eq(1).text()},
            "brief":function($){return $('.bookinfo .intro').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.bookinfo .i1').eq(0).text()},
            "isend":function($){return $('.bookinfo .i1').eq(2).text()}
        },
        "contentPage":{
            "content":function($){return $("#content").html()},
            /*"ajax":function($){
                var url = $('#content').find('script').eq(1).text();
                url = "http://124.248.239.100:59288/u/txt/" + url.replace(/outputTxt\("(.*)?"\).* /i,"$1");
                return {
                    url:url,
                    dataType:"text",
                    success:function(data){return data},
                    headers:{
                        Referer:$.location
                    }
                }
            },*/
            "footer":function($){return $(".footer").length}
        }
    },
    "replacer":{
        "title":["《","》"],
        "author":"作   者：",
        "classes":"类   别：",
        "brief":"<strong>【作品简介】：<\\/strong>",
        "content":["^document.write\\('","'\\)$",{"<[^<>]*>":"\n"}]
    }
}
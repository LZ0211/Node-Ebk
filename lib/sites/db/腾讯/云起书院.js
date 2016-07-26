module.exports = {
    "siteName":"云起书院",
    "siteURL":"http://yunqi.qq.com",
    "history":[],
    "charset":"utf8",
    "deep":true,
    "filter":{
        "indexPage":function($){$('.list:contains("VIP卷")').remove()},
        "contentPage":function($){$('div.text a').parent('p').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.list > ul').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.tablist a').eq(0).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.left > .title a').eq(-2).text()},
            "author":function($){return $('.au_name a').text()},
            "brief":function($){return $('.info').text()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.left > .title a').eq(-3).text()},
            "tags":function($){return $('div.tags').text()},
            "isend":function($){return $('#novelInfo').find('span.red2').text()}
        },
        "contentPage":{
            "content":function($){return $('div.text').html()},
            "footer":function($){return 1},
            "ajax":function ($){
                var script = $('script').text();
                var matched,bid,uuid;
                if (matched = script.match(/bid = "(\d+)"/)){
                    bid = matched[1];
                }
                if (matched = script.match(/uuid = "(\d+)"/)){
                    uuid = matched[1];
                }
                return {
                    url : '/index.php/Bookreader/' + bid + '/' + uuid,
                    method : 'POST',
                    data : 'lang=zhs&w=830&fontsize=24',
                    dataType : "json",
                    success : function (data){
                        return data.Content;
                    }
                }
            }
        }
    },
    "replacer":{
        "tags":["作品标签：","\\s"]
    }
}
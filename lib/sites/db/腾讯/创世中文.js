module.exports = {
    "siteName":"创世中文",
    "siteURL":"http://chuangshi.qq.com",
    "history":[],
    "charset":"utf8",
    "deep":true,
    "filter":{
        "indexPage":function($){$('.list:contains("VIP卷")').remove()}
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
            "content":function($){return $('div.bookreadercontent').html()},
            "footer":function($){return 1},
            "ajax":function ($){
                var script = $('script').last().text();
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
                    data : 'lang=zhs',
                    dataType : "json",
                    success : function (data){
                        function _decryptByBaseCode(text,base){if(!text){return text;}
                            var arrStr=[],arrText=text.split('\\');for(var i=1,len=arrText.length;i<len;i++){arrStr.push(String.fromCharCode(parseInt(arrText[i],base)));}
                            return arrStr.join('');
                        }
                        return _decryptByBaseCode(data.Content,30);
                    }
                }
            }
        }
    },
    "replacer":{
        "tags":["作品标签：","\\s"]
    }
}
module.exports = {
    "siteName":"傲世中文网",
    "siteURL":"http://www.23zw.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$("#adright").remove()},
        "indexPage":function ($){
            var list = $(".chapter_list_chapter");
            var temp = {};
            var arr=[];
            for (var i=0;i<list.length ;i++ ){
                temp[i%4]=list.eq(i);
                if (i%4 == 3){
                    arr.push(temp[0].find("a").eq(0));
                    arr.push(temp[1].find("a").eq(0));
                    arr.push(temp[2].find("a").eq(0));
                    arr.push(temp[3].find("a").eq(0));
                    arr.push(temp[0].find("a").eq(1));
                    arr.push(temp[1].find("a").eq(1));
                    arr.push(temp[2].find("a").eq(1));
                    arr.push(temp[3].find("a").eq(1));
                }
            }
            var $chapter_list = $("#chapter_list");
            $chapter_list.empty();
            arr.forEach(function (v){
                $chapter_list.append(v)
            });
        },
        "infoPage":function ($){$('.intro strong').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('#chapter_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.chapter_list_novel_title > h1').text()},
            "author":function($){return $('.article_detail').text()},
            "brief":function($){return $('.intro').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.article_detail').text()},
            "isend":function($){return $('.article_detail a').last().text()}
        },
        "contentPage":{
            "content":function($){return $('#text_area').html()}
        }
    },
    "replacer":{
        "author":{".*作者：([^\\s\\|]*)[\\s\\S]*":"$1"},
        "classes":{".*类别：([^\\s\\|]*)[\\s\\S]*":"$1"},
        "brief":"：    "
    }
}
module.exports = {
    "siteName":"第一版主",
    "siteURL":"http://www.01bz.xyz",
    "history":["http://www.01bz.me","http://www.01bz.la","http://www.01bz.wang","http://www.01bz.top"],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('div.box_box script').remove();
            $('.box_box a').each(function (i,v){
                $(v).replaceWith($(v).text());
            });
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.list_box a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('.title h2').text()},
            "author":function($){return $('div.info a').eq(0).text()},
            "brief":function($){return $('div.words').text()},
            "cover":function($){return $('div.pic img').attr('src')},
            "classes":function($){return $('div.info a').eq(1).text()},
            "isend":function($){return $('li.wj').text()}
        },
        "contentPage":{
            "content":function($){return $('div.box_box').html()}
        }
    },
    "replacer":{
        "isend":"状态：",
        "brief":"[\\s\\S]*?简介：",
        "content":[
            "更.{0,2}多.{0,2}精.{0,2}彩.*?站\\s",
            "w.{0,5}w.{0,5}w.{0,5}0.{0,5}1.{0,5}b.{0,5}z.{0,5}n.{0,5}e.{0,5}t",
            "（?感谢光临第一版主小说站",
            "【本小说发自.*",
            "\"\\);",
            " ?\\('",
            {
                "(「[^「」\\n]{0,6}[^？。]」)\\n":"$1",
                "([……。！？])\\n([^「」]{0,30}」)":"$1$2",
                "([……——])\\n([啊哎唔])":"$1$2"
            }
        ]
    }
}
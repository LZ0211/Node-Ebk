module.exports = {
    "siteName":"第一版主",
    "siteURL":"http://www.001bz.net",
    "history":["http://www.001bz.com","http://www.01bz.in","http://www.01bz.xyz","http://www.01bz.me","http://www.01bz.la","http://www.01bz.wang","http://www.01bz.top"],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){
            $('div.box_box').find("img,script").remove();
            $('.box_box a').each(function (i,v){
                $(v).replaceWith($(v).text());
            });
            $('.box_box div').each(function (i,v){
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
            "content":function($){return $('div.box_box').html() || $(".page-content").html()},
            "footer":function($){return $('.floatBox').length || $(".copyright").length}
        }
    },
    "replacer":{
        "doc":{"\s+<div>":"<div>"},
        "isend":"状态：",
        "brief":"[\\s\\S]*?简介：",
        "content":[
            {"读.{0,2}精.{0,2}彩.{0,2}小.*?<":"<"},
            {"看.{0,2}精.{0,2}彩.*?<":"<"},
            {".*?百.{0,2}度.{0,2}搜.{0,2}第.{0,2}一.{0,2}版.{0,2}主.{0,2}小.{0,2}说.{0,2}站.*?<":"<"},
            "更.{0,2}多.{0,2}精.{0,2}彩.*?站\\s",
            "[wWｗＷ].{0,5}[wWｗＷ].{0,5}[wWｗＷ].{0,5}[0０].{0,5}[1１].{0,5}[bBｂＢ].{0,5}[zZｚＺ].{0,5}[nNｎＮ].{0,5}[eEｅＥ].{0,5}[tTｔＴ]",
            "（?感谢光临第一版主小说站",
            "【本小说发自.*",
            "\"\\);",
            " ?\\('",
            "'\\) -- The CHM[\\s\\S]*",
            "'\\)\\n",
            "This file was saved using.*",
            "The file was .*",
            "Download ChmDecompiler .*",
            "Download Decompiler.*",
            "（结尾英文忽略即可）",
            "看.{0,2}第.{0,2}一.{0,2}时.{0,2}间.{0,2}更.{0,2}新",
            "看.{0,2}精.{0,2}彩.{0,2}小.{0,2}说.{0,2}尽.{0,2}在.{0,2}版.{0,2}主.{0,2}小.{0,2}站",
            "【更多小说请大家到.*?】",
            "发送电子邮件.*?最新网址",
            "第一版主既是",
            {
                "(「[^「」]{0,6}[^？。]」)\\n*":"$1",
                "([……。！？])\\n([^「」]{0,30}」)":"$1$2",
                "([……——])\\n([啊哎唔])":"$1$2"
            }
        ]
    }
}
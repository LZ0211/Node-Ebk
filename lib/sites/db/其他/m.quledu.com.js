module.exports = {
    "siteName":"无错小说手机网",
    "siteURL":"http://m.quledu.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){
            $('a:contains("本站重要公告")').remove();
        },
        "contentPage":function($){
            $('#txt').find("script,div").remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.zjlist4 a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('meta[property="og:title"]').attr('content')},
            "author":function($){
                var html = $('#bookname').next().html();
                if (!html){
                    return $('meta[property="og:novel:author"]').attr('content');
                }
                var matched = html.match(/作者：([^<]*)/);
                if (matched && matched[1] ){
                    return matched[1]
                }
                return $('meta[property="og:novel:author"]').attr('content');
            },
            "brief":function($){return $('meta[property="og:description"]').attr('content')},
            "cover":function($){return $('meta[property="og:image"]').attr('content')},
            "classes":function($){return $('meta[property="og:novel:category"]').attr('content')},
            "isend":function($){return $('meta[property="og:novel:status"]').attr('content')==0 ? "连载" :"完结"}
        },
        "contentPage":{
            "content":function($){return $('#txt').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "author":{"&nbsp;":""},
        "content":[
            "[\\x20-\\x7e]{1,4}无.{1,8}错.{1,4}小说.{1,4}[ＷWwmMＭ]+.*?[cCＣ][oOＯ][mＭ]",
            "\\W?无\\W{0,2}错\\W{0,2}小\\W{0,2}说.{0,2}([ＷWwmMＭ]*.*?[cCＣ][oOＯ][mMＭ])?",
            ";$",
            "[mMＭ].{8}[cCＣ][oOＯ][mMＭ]",
            "手机看小说哪家强？ 阅读网",
            ".*ddefr\\.jpg.*|无(?:错|.*cuoa?w\\.jpg.*)小说网不[少跳]字|w[a-z\\.]*om?|.*由[【无*错】].*会员手打[\\s\\S]*",
            "无错不跳字|无广告看着就是爽!|一秒记住.*|全文免费阅读.*|8 9 阅阅 读 网|看小说最快更新|“小#说看本书无广告更新最快”",
            "<无-错>",
            "—无—错—小说",
            "是 由",
            "&nbsp;",
            {"[\\n\\r\\t]+":"\n"},
            "^\\n|\\n$"
        ]
    }
}
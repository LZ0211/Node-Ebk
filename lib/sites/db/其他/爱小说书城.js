var KeyReplace = "暴逼插擦操淫阴屄潮抽处床春唇刺粗洞逗硬峰抚摸腹干搞根宫勾股狠滑魂鸡夹奸交精紧菊裤胯裸毛迷糜靡尿搐咛趴喷屁骑裙肉揉乳软润塞骚搔舌射兽爽酥烫舔胸脱吻慰握喔性痒药滢姨穴欲吸弄汁诱惑慾腿具咬吹味屌怒龟涨情坚体露屁液水肛蜜啊动激爱浪禁枪嫩搂母湿挺野幽呻吟舒荡缠泄裆驰勃箫额龙茎道棒抠疼麻醉按伦轮法国犯妈婆日色流睡阳味身胞恋腰胀爬禁撑叫黄缩虐妻进嘴腔嗷";
module.exports = {
    "siteName":"爱小说书城",
    "siteURL":"http://www.aixstxt.com",
    "history":[],
    "charset":"utf8",
    "filter":{
        "contentPage":function($){
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.Chapter a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.NovelChapter dt').find('a').eq(-1).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.NovelName h1').text()},
            "author":function($){return $('.NovelNote u').eq(0).text()},
            "brief":function($){return $('.NovelContent').html()},
            "cover":function($){return $('img.Pic_Line').attr('src')},
            "classes":function($){return $('.NovelInfo dt').eq(0).find('a').eq(-1).text()},
            "isend":function($){return $('.NovelNote li').eq(-1).text()}
        },
        "contentPage":{
            "content":function($){return $('#Content').html()},
            "footer":function($){return 1},
            "ajax":function($){
                var script = $('#Content').next('script').next('script').text();
                var url = script.replace("startRequest('","").replace("', 'Content');","");
                return {
                    url : "http://www.aixstxt.com" + url,
                    method : "GET",
                    success : function(data){
                        var txt = data.toString();
                        txt = txt.replace(/<span class=['"]T_(\d+)['"]>/ig,function($,$1){
                            return KeyReplace.charAt($1 - ($1.length == 3 ? 1 : 0)*10 - 1);
                        });
                        return '<div id="Content">' + txt + '</div>';
                    }
                }
            }
        }
    },
    "replacer":{
    }
}
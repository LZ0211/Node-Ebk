module.exports = {
    "siteName":"无错小说网",
    "siteURL":"http://www.quledu.com",
    "history":["http://www.wcxiaoshuo.com"],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){
            $('a:contains("本站重要公告")').remove();
        },
        "contentPage":function($){
            $('img').each(function (i,v){
                $(v).replaceWith($(v).attr('src'));
            });
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('div.zjlist4 a').map((i,v)=>({href:"http://m.quledu.com"+$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('meta[property="og:title"]').attr('content')},
            "author":function($){
                var html = $('#bookname').next().html();
                var matched = html.match(/作者：([^<]*)?&nbsp;/);
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
            "content":function($){return $('#htmlContent').html()},
            "footer":function($){return $('.papgbutton').length}
        }
    },
    "replacer":{
        "author":{"&nbsp;":""},
        "content":[
            {
                "\\n.*?/sss/ddefr.jpg[\\s\\S]*" :"",
                "/sss/da.jpg": "打",
                "/sss/maws.jpg": "吗？",
                "/sss/baw.jpg": "吧？",
                "/sss/wuc.jpg": "无",
                "/sss/maosu.jpg": "：“",
                "/sss/cuow.jpg": "错",
                "/sss/ziji.jpg": "自己",
                "/sss/shenme.jpg": "什么",
                "/sss/huiqub.jpg": "回去",
                "/sss/sjian.jpg": "时间",
                "/sss/zome.jpg": "怎么",
                "/sss/zhido.jpg": "知道",
                "/sss/xiaxin.jpg": "相信",
                "/sss/faxian.jpg": "发现",
                "/sss/shhua.jpg": "说话",
                "/sss/dajiex.jpg": "大姐",
                "/sss/dongxi.jpg": "东西",
                "/sss/erzib.jpg": "儿子",
                "/sss/guolair.jpg": "过来",
                "/sss/xiabang.jpg": "下班",
                "/sss/zangfl.jpg": "丈夫",
                "/sss/dianhua.jpg": "电话",
                "/sss/huilaim.jpg": "回来",
                "/sss/xiawu.jpg": "下午",
                "/sss/guoquu.jpg": "过去",
                "/sss/shangba.jpg": "上班",
                "/sss/mingtn.jpg": "明天",
                "/sss/nvrenjj.jpg": "女人",
                "/sss/shangwo.jpg": "上午",
                "/sss/shji.jpg": "手机",
                "/sss/xiaoxinyy.jpg": "小心",
                "/sss/furene.jpg": "夫人",
                "/sss/gongzih.jpg": "公子",
                "/sss/xiansg.jpg": "先生",
                "/sss/penyouxi.jpg": "朋友",
                "/sss/xiaoje.jpg": "小姐",
                "/sss/xifup.jpg": "媳妇",
                "/sss/nvxudjj.jpg": "女婿",
                "/sss/xondi.jpg": "兄弟",
                "/sss/lagong.jpg": "老公",
                "/sss/lapo.jpg": "老婆",
                "/sss/meimeid.jpg": "妹妹",
                "/sss/jiejiev.jpg": "姐姐",
                "/sss/jiemeiv.jpg": "姐妹",
                "/sss/xianggx.jpg": "相公",
                "/sss/6shenumev.jpg": "什么",
                "/sss/cuoaw.jpg": "错",
                "/sss/fpefnyoturxi.jpg": "朋友",
                "/sss/vfsjgigarn.jpg": "时间",
                "/sss/zzhiedo3.jpg": "知道",
                "/sss/zibjib.jpg": "自己",
                "/sss/qdonglxi.jpg": "东西",
                "/sss/hxiapxint.jpg": "相信",
                "/sss/fezrormre.jpg": "怎么",
                "/sss/nvdrfenfjfj.jpg": "女人",
                "/sss/jhiheejeieev.jpg": "姐姐",
                "/sss/xdifagojge.jpg": "小姐",
                "/sss/gggugolgair.jpg": "过来",
                "/sss/maoashu.jpg": "：“",
                "/sss/gnxnifawhu.jpg": "下午",
                "/sss/rgtugoqgugu.jpg": "过去",
                "/sss/khjukilkaim.jpg": "回来",
                "/sss/gxhigfadnoxihnyy.jpg": "小心",
                "/sss/bkbskhhuka.jpg": "说话",
                "/sss/xeieavnfsg.jpg": "先生",
                "/sss/yuhhfuiuqub.jpg": "回去",
                "/sss/pdianphua.jpg": "电话",
                "/sss/fabxianr.jpg": "发现",
                "/sss/feilrpto.jpg": "老婆",
                "/sss/gxronfdri.jpg": "兄弟",
                "/sss/flfaggofng.jpg": "老公",
                "/sss/tymyigngtyn.jpg": "明天",
                "/sss/dfshfhhfjfi.jpg": "手机",
                "/sss/gstjhranjgwjo.jpg": "上午",
                "/sss/fmgeyimehid.jpg": "妹妹",
                "/sss/gxgihftutp.jpg": "媳妇",
                "/sss/cerztifb.jpg": "儿子",
                "/sss/gfxgigagbfadng.jpg": "下班",
                "/sss/gstjhranjg.jpg": "下午",
                "/sss/hjeirerm6eihv.jpg": "姐妹",
                "/sss/edajihexr.jpg": "大姐",
                "/sss/wesfhranrrgba.jpg": "上班",
                "/sss/gfognggzigh.jpg": "公子",
                "/sss/frurtefne.jpg": "夫人",
                "/sss/fzagnggfbl.jpg": "丈夫",
                "/sss/nvdxfudfjfj.jpg": "女婿",
                "/sss/xdidafnggx.jpg": "相公",
                "/sss/zenme.jpg": "怎么",
                "/sss/gongzi.jpg": "公子"
            },
            "\\W?无\\W{0,2}错\\W{0,2}小\\W{0,2}说.{0,2}([ＷWwmMＭ]*.*?[cCＣ][oOＯ][mMＭ])?",
            ";$",
            "[mMＭ].{8}[cCＣ][oOＯ][mMＭ]",
            "手机看小说哪家强？ 阅读网",
            ".*ddefr\\.jpg.*|无(?:错|.*cuoa?w\\.jpg.*)小说网不[少跳]字|w[a-z\\.]*om?|.*由[【无*错】].*会员手打[\\s\\S]*",
            "无错不跳字|无广告看着就是爽!|一秒记住.*|全文免费阅读.*|8 9 阅阅 读 网|看小说最快更新|“小#说看本书无广告更新最快”",
            "[\\x20-\\x7e]{1,4}无.{1,8}错.{1,4}小说.{1,4}[ＷWwmMＭ]+.*?[cCＣ][oOＯ][mＭ]",
            "<无-错>",
            "—无—错—小说",
            "是 由",
            "&nbsp;",
            {"[\\n\\r\\t]+":"\n"},
            "^\\n|\\n$"
        ]
    }
}
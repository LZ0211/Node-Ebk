module.exports = {
    "siteName":"sis001",
    "siteURL":"http://38.103.161.226",
    "history":[],
    "charset":"gbk",
    "deep": true,
    "gid":function(url){return url.split('/').pop().match(/thread-(\d+)/)[1]},
    "filter":{
        "contentPage":function($){
            $('div.t_msgfont').find('fieldset,table').remove();
            var $posts=$('div.mainbox'),
                main=$posts.first().find('div.t_msgfont'),
                html='';
            $posts.each(function(c,a){
                a=$(a);
                var b=a.find('div.t_msgfont');
                if(1E3<b.text().length||a.find('#ajax_thanks').length)html+=b.html()
            });
            main.html(html);
            main.append($('.postattachlist a').eq(1).clone());
        },
        "indexPage":function ($){
            $('th.new').attr('class','hot');
            $('th.common').attr('class','hot');
            $('th.lock').attr('class','hot');
            $('span.threadpages').remove();
            $('th:contains("版务")').remove();
            $('th:contains("阅读权限")').remove();
            $('img[alt="全局置顶"]').parents('.hot').remove();
            $('img[alt="分类置顶"]').parents('.hot').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('th > span > a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('div.mainbox > h1 > a').text()},
            "author":"sis001",
            "brief":function($){return $('div.mainbox > h1 > a > span').text()},
            "cover":"http://38.103.161.226/forum/images/green001/logo.png",
            "classes":function($){return $('div.mainbox > h1 > a > span').text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('div.t_msgfont').eq(0).html()},
            "nextPage":function($){return $('.pages_btns > .pages > a.next').attr('href')},
            "file":function($){var $a = $('dl.t_attachlist > dt > a').eq(1);return {src:$a.attr('href'),file:$a.text()}}
        }
    },
    "replacer":{
        "content":["附件: 您所在的用户组无法下载或查看附件","\\[ 本帖最后由.*?编辑 \\]","复制内容到剪贴板","代码:"]
    }
}
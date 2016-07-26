module.exports = {
    "siteName":"第一版主论坛",
    "siteURL":"http://www.diyibanzhu.com",
    "history":[],
    "charset":"gbk",
    "gid":function(url){return url.match(/thread-(\d+)/)[1]},
    "filter":{
        "contentPage":function($){
            if ($('#scrolltop').length === 0){
                return $('div.t_fsz').remove();
            }
            $('.attach_tips').remove();
            var $posts=$('div.t_fsz'),
                main=$posts.first().find('table'),
                html='';
            $posts.each(function(c,a){
                a=$(a);
                var b=a.find('table');
                if(1E3<b.text().replace(/\w+/g,'').length||a.find('#favoritenumber').length)html+=b.html()
            });
            html += '<div id="file">' + $('ignore_js_op > span').html() + '</div>';
            main.html(html);
        },
        "indexPage":function ($){
            $('th.new').attr('class','common');
            $('th.lock').attr('class','common');
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('th.common a.xst').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('h1 a').eq(0).text()},
            "author":"第一版主论坛",
            "brief":function($){return $('h1 a').eq(0).text()},
            "cover":"http://www.diyibanzhu.com/data/attachment/forum/201512/26/094310j4uvxepu694ox4xl.jpg",
            "classes":function($){return $('h1 a').eq(0).text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('.t_fsz').eq(0).html()},
            "footer":function($){return $('#discuz_tips').length},
            "nextPage":function($){var page = $('.pg strong').next('a').attr('href'); return page && page.replace(/&amp;/ig,"&")},
            "file":function($){var $a = $('#file a').eq(0);return {src:$a.attr('href'),file:$a.text()}}
        }
    },
    "replacer":{
    }
}
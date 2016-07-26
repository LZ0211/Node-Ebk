module.exports = {
    "siteName":"龙坛",
    "siteURL":"http://www.lungtan.com",
    "history":[],
    "charset":"utf8",
    "deep":true,
    "gid":function(url){return url.match(/tid=(\d+)/)[1]},
    "filter":{
        "indexPage":function($){$('#separatorline').prevAll().remove()},
        "contentPage":function ($){
            var $posts=$('#postlist div'),
                main=$posts.first().find('div.pct'),
                html='';
            $posts.each(function(c,a){
                a=$(a);
                var b=a.find('div.pct');
                if(2E3<b.text().length||a.find('#reward_icon').length){
                    html+=b.html();
                }
            });
            main.html(html);
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('h3.ptn > a').map((i,v)=>({href:$(v).attr('href').replace(/&amp;/g,'&'),text:$(v).text()})).toArray()},
            "infoURL":null
        },
        "infoPage":{
            "title":function($){return $('h1.xs2 > a').text()},
            "author":"龙坛",
            "brief":function($){return $('h1.xs2 > a').text()},
            "cover":function($){return $('div.bm > img').attr('src')},
            "classes":function($){return $('h1.xs2 > a').text()},
            "isend":false
        },
        "contentPage":{
            "content":function($){return $('.pcb td').eq(0).text()},
            "footer":function($){return $('#scrolltop').length},
            "nextPage":function($){return $('div.pg > a.nxt').attr('href')},
            "title":function($){return $('h1.ts a').last().text()},
            "author":function($){return $('.authi > a').first().text()},
            "classes":function($){return $('h1.ts a').first().text()},
            "cover":function($){return $('.pcb td').eq(0).find('img').attr('file')},
            "brief":function($){return $('.t_table').html()},
            "isend":false,
            "index":function($){return $('.t_table a').map((i,v)=>({href:$(v).attr('href').replace(/&amp;/g,'&'),text:$(v).text()})).toArray()}
        }
    },
    "replacer":{
    }
}
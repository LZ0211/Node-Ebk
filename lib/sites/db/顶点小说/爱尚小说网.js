module.exports = {
    "siteName":"爱尚小说网",
    "siteURL":"http://www.23xsw.cc",
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":function($){
            $('li.zp_bt:contains("目录开始")').prevAll().remove()
        },
        "contentPage":function($){
            $('#contents').find('p').remove();
        }
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.zp_li a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('a:contains("返回书页")').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('#content h1').text()},
            "author":function($){return $('div.fl tr').first().text()},
            "brief":function($){return $('#sidename').prev('p').html()},
            "cover":function($){return $('#content img').attr('src')},
            "classes":function($){return $('div.fl tr').first().text()},
            "isend":function($){return $('div.fl tr').first().text()}
        },
        "contentPage":{
            "content":function($){return $('#contents').html()},
            "footer":function($){return $('#contfoot').length}
        }
    },
    "replacer":{
        "title":["全文阅读","\\s"],
        "author":[".*?文章作者","文章状态.*","\\s","&nbsp;"],
        "classes":[".*?文章类别","文章作者.*","\\s","&nbsp;"],
        "isend":[".*?文章状态","\\s","&nbsp;"],
        "brief":["&nbsp;"],
        "indexText":["〔文〕","（.{1,3}更.*?）"]
    }
}
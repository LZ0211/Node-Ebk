module.exports = {
    "siteName":"棉花糖小说网",
    "siteURL":"http://www.mianhuatang.cc",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('.content').find('div,strong,script,a,p').remove()}
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.novel_list a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "infoURL":function($){return $('.nowplace a').eq(2).attr('href')}
        },
        "infoPage":{
            "title":function($){return $('.info h1').text()},
            "author":function($){return $('.author a').text()},
            "brief":function($){return $('.r_cons').html()},
            "cover":function($){return $('.con_limg img').attr('src')},
            "classes":function($){return $('.txt_nav a').eq(1).text()},
            "isend":function($){return $('.con_txt script').text()}
        },
        "contentPage":{
            "content":function($){return $('.content').html()},
            "footer":function($){return $('.footer').length}
        }
    },
    "replacer":{
        "brief":['<h2>.*?<\\/h2>','<q>.*?<\\/q>']
    }
}
module.exports = {
    "siteName":"起点文档",
    "siteURL":"http://files.qidian.com",
    "history":[],
    "charset":"gbk",
    "filter":{
        "contentPage":function($){$('a').remove()}
    },
    "selector":{
        "indexPage":{
        },
        "infoPage":{
        },
        "contentPage":{
            "content":function($){return $.html()}
        }
    },
    "replacer":{
        "content":{
            "document.write\\('":"",
            "'\\);":"",
            "<p>":"<p>\n",
            "^\\s":""
        }
    }
}
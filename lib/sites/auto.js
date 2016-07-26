var cache = {};

function footer($){
    var content,selector;
    if (/<html>/.test($.html()) == false){
        return 1
    }
    var selectors = [".footer", "#footer"];
    for (var i=0;i<selectors.length ;i++ ){
        selector = selectors[i];
        content = $(selector);
        if (content.length){
            break;
        }
        content = null;
    }
    if (!content){
        var rcontent = /(footer|foot|bottom|botm|btm|copyRight)/i;
        var $divs = $('*');
        
        for (var k=0;k<$divs.length;k++){
            var ele = $divs.eq(k);
            var classname = ele.attr('class');
            var id = ele.attr('id');
            if (rcontent.test(classname) || rcontent.test(id)){
                content = ele;
                break;
            }
        }
    }
    if (content){
        return content.length;
    }
    return ($.html().match(/<\/html>/i) || []).length;
}

module.exports={
    "siteName":undefined,
    "siteURL":undefined,
    "history":[],
    "charset":"gbk",
    "filter":{
        "indexPage":undefined,
        "infoPage":undefined,
        "contentPage":undefined
    },
    "selector":{
        "indexPage":{
            "index":function($){
                var list,selector;
                var selectors = [".list","#list","#chapter_list",".chapter_list",".chapterNum",".chapterlist","#chapterlist","#readerlist",".chapter-list"]
                for (var i=0;i<selectors.length ;i++ ){
                    selector = selectors[i];
                    list = $(selector);
                    if (list.length && list.find('a').length){
                        break;
                    }else {
                        list = null;
                    }
                }
                var rlist = /list/i;
                if (!list){
                    var $divs = $('*');
                    for (var k=0;k<$divs.length;k++){
                        var ele = $divs.eq(k);
                        var classname = ele.attr('class');
                        var id = ele.attr('id');
                        if (rlist.test(classname) || rlist.test(id)){
                            if (ele.find('a').length){
                                list = ele;
                                break;
                            }
                        }
                    }
                }
                if (list){
                    return list.find('a').map(function (i,v){
                        return {href:$(v).attr('href'),text:$(v).text()}
                    }).toArray();
                }else {
                    return [];
                }
            },
            "infoURL":function($){
                return $('a:contains("返回书页")').attr('href');
            },
            "footer":footer
        },
        "infoPage":{
            "title":function($){
                var selectors = ['h1','#title','.title','.BookTitle','meta[property="og:title"]'];
                for (var i=0;i<selectors.length;i++){
                    var selector = selectors[i];
                    var title = $(selector);
                    if (title.find('a').length){
                        title = title.find('a').eq(0);
                        return title.text();
                    }
                }
                return;
            },
            "author":function($){return $('.info112 a').eq(0).text()},
            "brief":function($){return $('#bookmemoword').html()},
            "cover":function($){return $('.info12 img').attr('src')},
            "classes":function($){return $('.info112 a').eq(1).text()},
            "isend":function($){return $('.info113 i').eq(1).text()},
            "footer":footer
        },
        "contentPage":{
            "content":function($){
                var content,selector;
                var selectors = ["#pagecontent", "#contentbox", "#bmsy_content", "#bookpartinfo", "#htmlContent","#text_area", "#chapter_content", "#chapterContent", "#partbody","#article_content", "#BookTextRead", "#booktext", "#BookText", "#readtext", "#text_c", "#txt_td", "#TXT", "#txt", "#zjneirong",".novel_content", ".readmain_inner", ".noveltext", ".booktext", ".yd_text2","#contentTxt", "#oldtext", "#a_content", "#contents", "#content2", "#contentts", "#content", ".content"];
                for (var i=0;i<selectors.length ;i++ ){
                    selector = selectors[i];
                    content = $(selector);
                    if (content.length && content.text().length > 100){
                        break;
                    }
                    content = null;
                }
                if (!content){
                    var rcontent = /(content|text|read|neirong)/i;
                    var $divs = $('*');
                    
                    for (var k=0;k<$divs.length;k++){
                        var ele = $divs.eq(k);
                        var classname = ele.attr('class');
                        var id = ele.attr('id');
                        if (rcontent.test(classname) || rcontent.test(id)){
                            if (ele.text().length > 100){
                                content = ele;
                                break;
                            }
                        }
                    }
                }
                if (content){
                    content.find('script,img,a').remove();
                    content.find(':header').remove();
                    return content.html();
                }
                return;
            },
            "footer":footer
        }
    },
    "replacer":{
    }
}
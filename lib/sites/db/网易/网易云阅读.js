module.exports = {
    "siteName":"网易云阅读",
    "siteURL":"http://yuedu.163.com",
    "history":[],
    "charset":"utf8",
    "filter":{
    },
    "selector":{
        "indexPage":{
            "index":function($){return $('.directory a').map((i,v)=>({href:$(v).attr('href'),text:$(v).text()})).toArray()},
            "ajax":function ($){
                return {
                    url:$.location.replace("operation=catalog","operation=info"),
                    method:"GET",
                    dataType:"json",
                    success:function (data){
                        var sourceUuid = data.book.sourceUuid;
                        return data.catalog.filter(function(item){
                            return item.price == 0;
                        }).map(function (item,index){
                            return {
                                href:"http://yuedu.163.com/book_reader/" + sourceUuid + "/" + item.uuid,
                                text:item.title,
                                id:index+1
                            }
                        })
                    }
                }
            },
            "infoURL":function($){return $.location.replace("newBookReader.do?operation=catalog&sourceUuid=","source/")}
        },
        "infoPage":{
            "title":function($){return $('.f-fl h3').text()},
            "author":function($){return $('.f-fl td').eq(3).text()},
            "brief":function($){return $('.txt').html()},
            "cover":function($){return $('.cover img').attr('src')},
            "classes":function($){return $('.f-fl td').eq(1).text()},
            "isend":function($){return $('.f-fl td').eq(9).text()}
        },
        "contentPage":{
            "content":function($){
                $('.m-content h1').remove();
                return $('.m-content').html()
            },
            "footer":function($){return 1},
            "ajax":function($){
                var url = $.location;
                var arr = url.split("/");
                var articleUuid = arr.pop();
                var sourceUuid = arr.pop();
                return {
                    url : 'http://yuedu.163.com/getArticleContent.do?sourceUuid=' + sourceUuid + "&articleUuid=" + articleUuid,
                    method : 'GET',
                    dataType : "json",
                    success : function (data){
                        return new Buffer(data.content,"base64").toString();
                    }
                }
            }
        }
    },
    "replacer":{
    }
}
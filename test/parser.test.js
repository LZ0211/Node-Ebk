var request = require('../lib/request');
var Parser = require('../lib/Parser');


//测试下载规则
url = "http://read.qidian.com/BookReader/2X5S7b8bOYs1.aspx";
request.get(url).then(function (data){
    Parser.init(data,url);
    console.log(Parser.rule);
    console.log("测试下载目录");
    var IndexPage = Parser.parseIndexPage()
    console.log(IndexPage);
    var infoURL = IndexPage.infoURL;
    console.log("检索到信息页",infoURL);
    request.get(infoURL).then(function (data){
        Parser.init(data,infoURL);
        //console.log(Parser.parseInfoPage());
        console.log(Parser.getBookInfos())
    });
    var contentURL = IndexPage.index[0].href;
    console.log("测试内容页",contentURL);
    request.get(contentURL).then(function (data){
        Parser.init(data,url);
        var ContentPage = Parser.parseContentPage();
        console.log(ContentPage);
        console.log(Parser.getContent())
        if (ContentPage.nextPage){
            request.get(ContentPage.nextPage).then(function (data){
                Parser.init(data,ContentPage.nextPage);
                console.log(Parser.doc)
            });
        }
    });
});


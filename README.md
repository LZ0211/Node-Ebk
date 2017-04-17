# Author has abandoned this projec, and refactore to a new project https://github.com/LZ0211/Wedge

# Node-Ebk
Web Crawler which can config rules to collect information and generation e-book file
# Use
### [Assume the module folder is "app"]
#### download a new book
```Javascript
//auto change process directory to `dir`
var App = require("./app")("./library");

//config App arguments
App.config({
    "maxThreads":10,
    "changeSource":true,
    "genEbook":true
});

//execute Quest,start downloading
App.start("http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx");

```
#### equal to
```Javascript
//change process directory to `./library`
process.chdir("./library");
var Downloader = require("./app/lib/Downloader");

//generate an instance of Downloader
var App = new Downloader("http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx");

//config App arguments
App.config({
    "maxThreads":10,
    "changeSource":true,
    "genEbook":true
});

//execute Quest,start downloading
App.execute();
    
```

#### download muti-Quests
```Javascript
var App = require("./app")("./library");

//config App arguments
App.config({
    "maxThreads":10,
    "changeSource":true,
    "genEbook":true
});

//execute Quest,start downloading
App.start(["http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx","http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx"]);

```


#### update existing book
```Javascript

var App = require("./app")("./library");
App.update("爱潜水的乌贼/一世之尊");

```
#### equal to
```Javascript
//change process directory to `./library`
process.chdir("./library");

var Downloader = require("./app/lib/Downloader");
//generate an instance of Downloader
var App = new Downloader();
App.update("爱潜水的乌贼/一世之尊");
    
```
#### updates muli-Quests
```Javascript
var App = require("./app")("./library");
App.updates(["爱潜水的乌贼/一世之尊","..."]);
    
```

##Config Download Rule
####save config file to lib/sites/db 
```Javascript
module.exports = {
    "siteName":"起点中文",
    "siteURL":"http://read.qidian.com",//website host
    "history":["http://www.qidian.com"],//hostname once uesed or other domain,just in order to auto change source when update existed book or match infopage.
    "charset":"utf8",//website charset,utf8,gbk or big5
    "deep":true,
    "filter":{//do some filter before parse
        "contentPage":$=>$('#chaptercontent').find('script[type="text/javascript"]').remove(),
        
        "indexPage":$=>$('.box_title:contains("VIP章节")').next().remove()
    },
    "selector":{//selector, like jQuery
        "indexPage":{
            //return array and element is {"href":"...","text":"..."} object format
            "index":$=>$('.list > ul').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).find('span').text()})).toArray(),
            //if infopage is the same as indexpage, just null,otherwise must return href string 
            "infoURL":$=>$('#bookUrl').attr('href')
        },
        "infoPage":{
            "title":$=>$('h1[itemprop="name"]').text(),
            "author":$=>$('span[itemprop="author"]').text(),
            "brief":$=>$('span[itemprop="description"]').text(),
            "cover":$=>$('img[itemprop="image"]').attr('src'),
            "classes":$=>$('span[itemprop="genre"]').text(),
            "isend":$=>$('span[itemprop="updataStatus"]').text()
        },
        "contentPage":{
            "content":$=>$('#chaptercontent').text(),
            //in some website the content is splited into pages, or in iframe, we need to skip to other page
            "nextPage":$=>$('#chaptercontent script').attr('src'),
            //you can also get content by ajax
            /*"ajax":function($){return {
                url:$('#chaptercontent script').attr('src'),
                method:"GET",
                dataType:"text",
                success:function(data){
                    return data
                }
            }}*/
        }
    },
    "replacer":{
        "title":"\\s",
        "author":"\\s"
    }
}
```

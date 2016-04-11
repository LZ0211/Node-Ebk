# Node-Ebk
Web Crawler which can config rules to collect information and generation e-book file
# Use
### [Assume the module folder is "app"]
#### download a new book
```Javascript
var App = require("./app");
var app = new App("./library");//defaut argument is "./books",process change work directory to it
app.Project("http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx")//return an instance of Downloader and start
    .ebook("epub")//option,whether generate an e-book file after download
    .set("maxThreads",10)//option,the defaut maxThreads is 5
    .set("changeSource",true)//option,if the book file exists,whether change the book source,defaut is false

```
#### equal to
```Javascript
process.chdir("./library");
var Downloader = require("./app/lib/collector");
var quest = new Downloader("http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx");
quest.start()
    .ebook("epub")
    .set("maxThreads",10)
    .set("changeSource",true)
    
```
#### update existing book
```Javascript
var App = require("./app");
var app = new App("./library");
app.update("爱潜水的乌贼/一世之尊")

```
#### equal to
```Javascript
process.chdir("./library");
var Downloader = require("./app/lib/collector");
var quest = new Downloader();
quest.update("爱潜水的乌贼/一世之尊").start()
    
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
        "contentPage":function($){$('#chaptercontent').find('script[type="text/javascript"]').remove()},
        
        "indexPage":function($){$('.box_title:contains("VIP章节")').next().remove()}
    },
    "selector":{//selector, like jQuery
        "indexPage":{
            //return array and element is {"href":"...","text":"..."} object format
            "index":function($){return $('.list > ul').find('a').map((i,v)=>({href:$(v).attr('href'),text:$(v).find('span').text()})).toArray()},
            //if infopage is the same as indexpage, just null,otherwise must return href string 
            "infoURL":function($){return $('#bookUrl').attr('href')}
        },
        "infoPage":{
            "title":function($){return $('h1[itemprop="name"]').text()},
            "author":function($){return $('span[itemprop="author"]').text()},
            "brief":function($){return $('span[itemprop="description"]').text()},
            "cover":function($){return $('img[itemprop="image"]').attr('src')},
            "classes":function($){return $('span[itemprop="genre"]').text()},
            "isend":function($){return $('span[itemprop="updataStatus"]').text()}
        },
        "contentPage":{
            "content":function($){return $('#chaptercontent').text()},
            //in some website the content is splited into pages, or in iframe, we need to skip to other page
            "nextPage":function($){return $('#chaptercontent script').attr('src')},
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

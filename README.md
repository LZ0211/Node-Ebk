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
quest.update("./books/爱潜水的乌贼/一世之尊").start()
    
```

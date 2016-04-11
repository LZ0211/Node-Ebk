# Node-Ebk
Web Crawler which can config rules to collect information and generation e-book file
# Use
####Assume the module folder is "app"
```Javascript
var App = require("./app")
var app = new App()
app.Project("http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx")
    .ebook("epub")
    .set("maxThreads",10)
    .set("changeSource",true)

```
#### or
```Javascript
var Downloader = require("./app/lib/collector")
var quest = new Downloader("http://read.qidian.com/BookReader/9LxyoriyyTk1.aspx")
quest.start()
    .ebook("epub")
    .set("maxThreads",10)
    .set("changeSource",true)

```

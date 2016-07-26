var Downloader = require("../lib/Downloader");

//测试新建任务
//new Downloader(url) 等效于 (new Downloader()).init(url)
var url = "http://read.qidian.com/BookReader/2X5S7b8bOYs1.aspx";
var url2 = "http://read.qidian.com/BookReader/WcY2FmhYbtI1.aspx";
var app = new Downloader();
//单个任务
//app.init(url).execute();
//连续下载多个任务,one by one
//app.init([url,url2]).execute();
//同时进行多个任务
//app.init([[url],[url2]]).execute();
//合并目录，将第2...n个地址的目录合并给url
//app.init(url,url2).execute();
//或写成app.init(url).mergeIndexURLs(url2,url3).execute();


//更新已存在的小说
//var app = new Downloader();
//app.update("大江入海\\武侠世界自由行");

//配置运行参数
app.config("maxThreads",10);//最大的并发请求数目
app.config("mergeRate",3);//合并目录时的并发数目
app.config("downloadImages",false);//是否下载页面中的图片
app.config("changeSource",false);//当书籍已经存在，且和当前地址冲突时，是否换源
app.config("overOldChapters",false);//换源后是否覆盖已经下载的章节
app.config("genEbook",false);//书籍下载结束后自动生成电子书
app.config("forceEbook",false);//无论是否有更新都生成电子书，建议false
app.config("ebookDirectory","D:/ebooks");//电子书保存路径，建议使用绝对路径
app.config("ebookFormat","epub");//生成的电子书格式。有epub,chm,txt,snb,zip(压缩html),ztxt(压缩txt)

//将已下载章节生成电子书
//app.convertEbook("大江入海\\武侠世界自由行","epub")

//自定义下载器功能
//命名已存在会自动报错
app.extend("testFun",console.log)
app.testFun(12242)

//流程控制器
app.series([
    (next)=>{console.log("开始");next();},
    (next)=>{console.log(new Date);console.log("延迟3s执行下一步");setTimeout(next,3000)},
    ()=>{console.log(new Date)},
    ()=>{console.log("马上执行");console.log(new Date)},
    [
        ()=>{console.log("1完成")},
        (next)=>{setTimeout(()=>{console.log("2完成");next()},1000)},
        (next)=>{console.log("3完成");setTimeout(next,2000)}
    ],
    ()=>{console.log("1，2，3 全部完成")}
],function(){console.log("结束")});

//事件
//继承EventEmiter
//唯一自动触发事件end，只触发一次
app.end(function (){
    console.log("end")
});//绑定end事件

app.end()//触发end

//克隆app对象
var app2 = app.spawn();//返回一个新的Downloader实例，复制当前配置参数

console.log(app == app2);
console.log(app2.__CONFIG__ === app.__CONFIG__);
console.log(app.__CONFIG__);
console.log(app2.__CONFIG__);
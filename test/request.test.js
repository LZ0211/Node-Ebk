var request = require('../lib/request');
var Parser = require('../lib/Parser');


//测试请求模块

//测试 GET 请求
request.get("http://www.qidian.com").then(data=>console.log(data))

//测试 POST 请求
//模拟登陆zhihu.com
request.get("https://www.zhihu.com/#signin").then(function (data){
    var $ = Parser.load(data.toString()).$;
    //获取_xsrf校验码
    var _xsrf = $("input[name='_xsrf']").val();
    request.post("https://www.zhihu.com/login/email")
        .send({_xsrf:_xsrf,password:19920113,remember_me:true,email:"slxc920113@gmail.com"})
        .setHeader("X-Xsrftoken",_xsrf)
        //模拟ajax
        .setHeader("X-Requested-With","XMLHttpRequest")
        .end(function (err,res,buf){
            console.log(buf);
            request.get("https://www.zhihu.com/").end(function (err,res,buf){
                console.log(buf)
            });
        })
});

//测试 ajax 请求
//模拟起点内容请求
//ajax参数格式和jquery一样
request.ajax({
    url:"http://read.qidian.com/BookReader/2X5S7b8bOYs1,FAt-1W3FPm8ex0RJOkJclQ2.aspx",
    success:function (data){
        var $ = Parser.load(data).$;
        var src = $("script[charset='GB2312']").attr("src");
        console.log(src);
        request.ajax(src,{
            success:function (data){
                //gbk格式无法正确toString，需要iconv-lite
                var script = Parser.decode(data,"gbk");
                //沙盒模式运行脚本
                (new Function("document",script))({write:console.log});
            },
            error:err=>console.log(err)
        });
    }
});


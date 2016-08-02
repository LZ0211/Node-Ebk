var http = require('http'),
    https = require('https'),
    zlib = require('zlib'),
    URL = require('url'),
    Stream = require('stream'),
    inherits = require('util').inherits,
    querystring = require('querystring'),
    cookies = require('./cookies'),
    mime = require('./mime'),
    utils = require('./utils'),
    Headers = require('./headers');

var protocols = {
  'http:': http,
  'https:': https
};

var Parser = {
    "image":function (res,fn){
        var data = [];
        res.on('data', function(chunk){
            data.push(chunk);
        });
        res.on('end', function () {
            fn(null, res, Buffer.concat(data));
        });
    },
    "bin":function (res,fn){
        var data = [];
        res.on('data', function(chunk){
            data.push(chunk);
        });
        res.on('end', function () {
            fn(null, res, Buffer.concat(data));
        });
    },
    "json":function(res, fn){
        var text = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            text += chunk;
        });
        res.on('end', function(){
            try {
                var body = text && JSON.parse(text);
            } catch (e){
                var err = e;
                err.rawResponse = text || null;
                err.statusCode = res.statusCode;
            } finally {
                fn(err, res, body);
            }
        });
    },
    "text":function(res, fn){
        var text = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            text += chunk;
        });
        res.on('end', function (){
            fn(null, res, text);
        });
    },
    "form":function (res, fn){
        var text = '';
        res.setEncoding('ascii');
        res.on('data', function(chunk){
            text += chunk;
        });
        res.on('end', function(){
            try {
                fn(null, querystring.parse(text));
            } catch (err) {
                fn(err);
            }
        });
    }
}

function parse(res,fn){
    var contentType = res.headers['content-type'] || "";
    var mime = utils.type(contentType);
    var charset = utils.charset(contentType);
    if (utils.isJSON(mime)){
        return Parser.json(res,fn);
    }else if (utils.isText(mime)){
        if (charset && charset.match(/utf-?8/i)){
            return Parser.text(res,fn);
        }else {
            return Parser.bin(res,fn);
        }
    }else {
        return Parser.bin(res,fn);
    }
}

mime.define({
  'application/x-www-form-urlencoded': ['form', 'urlencoded', 'form-data']
});

function noop(){};

function Request(url,method) {
    Stream.call(this);
    this.headers = {};
    this.method = method || "GET";
    this.url = encodeURI(url);
    this._headers = {};
    this._query = {};
    this._data = {};
    this._timeout = 5000;
    this._callback = [];
    this._agent = false;
    this._redirects = 0;
    this._maxRedirects = 5;
    this._redirectList = [];
    this._reconnect = 3;   
    this.writable = true;
    this.setHeader(new Headers(url));
    this.cookie();
    this.query(URL.parse(url).query);
    return this.init();
}
inherits(Request,Stream);
var Proto = Request.prototype;
Proto.init = function (){
    this.on("error",e=>{return e});
    return this;
};
Proto.reconnect = function (times){
    this._reconnect = times;
    return this;
};
Proto.timeout = function (ms){
    this._timeout = ms;
    return this;
};
Proto.use = function (fn){
    fn(this);
    return this;
};
Proto.set = Proto.setHeader = function (key,val){
    if (typeof key === "object"){
        for (var k in key) {
          this.setHeader(k, key[k]);
        }
        return this;
    }
    this._headers[key.toLowerCase()] = val;
    this.headers[key] = val;
    return this;
};
Proto.del = Proto.unsetHeader = function (){
    for(var i=0;i<arguments.length;i++){
        var key = arguments[i].toLowerCase();
        delete this._headers[key];
        for(var k in this.headers){
            if(key === k.toLowerCase()){
                delete this.headers[k];
            }
        }
    }
    return this;
};
Proto.getHeader = function (key){
    return this._headers[key.toLowerCase()];
};
//Proto.get = Proto.getHeader;
//Proto.set = Proto.setHeader;
//Proto.unset = Proto.unsetHeader;
Proto.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.req && this.req.abort(); // node
  this.emit('abort');
  return this;
};
Proto.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    timeout:this._timeout,
    data: this._data,
  };
};
Proto.send = function(data){
    var isobj = utils.isObject(data);
    var type = this.getHeader('content-type');

    // merge
    if (isobj && utils.isObject(this._data)) {
        for (var key in data) {
            this._data[key] = data[key];
        }
    } else if (utils.isString(data)) {
        // default to x-www-form-urlencoded
        if (!type) this.type('form');
        type = this.getHeader('content-type');
        if ('application/x-www-form-urlencoded' == type) {
            this._data = querystring.parse(this._data);
            data = querystring.parse(data);
            this.send(data);
        } else {
            this._data = (this._data || '') + data;
        }
    } else {
        this._data = data;
    }
    if (!type) this.type('json');
    return this;
};
Proto.redirects = function (n){
    this._maxRedirects = n;
    return this;
}
Proto.type = function(type){
    this.setHeader('Content-Type', ~type.indexOf('/') ? type : mime.lookup(type));
    return this;
};
Proto.accept = function(type){
    this.setHeader('Accept',~type.indexOf('/') ? type : mime.lookup(type));
    return this;
};
Proto.referer = function(ref){
    this.setHeader('Referer', encodeURI(ref));
    return this;
};
Proto.auth = function(user, pass){
    var str = new Buffer(user + ':' + pass).toString('base64');
    this.setHeader('Authorization', 'Basic ' + str);
    return this;
};
Proto.ca = function(cert){
    this._ca = cert;
    return this;
};
Proto.query = function(val){
    if (utils.isObject(val)){
        for (var key in val) {
            this._query[key] = val[key];
        }
    }else if (utils.isString(val)){
        val = querystring.parse(val);
        return this.query(val);
    }
    return this;
};
Proto.callback = function (err,res,buffer){
    if (utils.isFunction(err)){
        this._callback.push(err);
    }else {
        this._callback.forEach(function (fn){
            fn(err,res,buffer);
        });
    }
};
Proto.redirect = function(res){
    var url = res.headers.location;
    var ref = this.url;
    if (!url) {
        return this.callback(new Error('No location header for redirect'), res);
    }
    url = URL.resolve(this.url, url);
    delete this.req;

    // redirect
    this.url = url;
    this._data = {};
    this._query = {};
    this.setHeader(new Headers(url));
    this.query(URL.parse(url).query);
    this.emit('redirect', res);
    this._redirectList.push(this.url);
    this.end();
    return this;
};
Proto.agent = function(agent){
    if (!arguments.length) return this._agent;
    this._agent = agent;
    return this;
};
Proto.cookie = function (){
    this.setHeader("Cookie",cookies.getCookie(this.url));
}
Proto.pipe = function(stream, options){
    this.piped = true;
    var self = this;
    this.end();
    this.req.on('response', function(res){
        // redirect
        var redirect = utils.isRedirect(res.statusCode);
            if (redirect && self._redirects++ != self._maxRedirects) {
            return self.redirect(res).pipe(stream, options);
        }
        if (res.statusCode !== 200){
            return self.pipe(stream, options);
        }
        if (utils.needUnzip(res)) {
            res.pipe(zlib.createUnzip()).pipe(stream, options);
        } else {
            res.pipe(stream, options);
        }
        res.on('end', function(){
            self.emit('end');
        });
    });
    // this.req.on('error',function (err){
    //     self.pipe(stream, options);
    // });
    return stream;
};
Proto.request = function (){
    var self = this;
    var options = {};
    var querystr = querystring.stringify(this._query);
    var url = this.url;
    if (0 != url.indexOf('http')) url = 'http://' + url;
    //var parsed = URL.parse(url, true);
    //url = parsed.protocol + "//" + parsed.host + parsed.pathname;
    //if (querystr) url += "?" + querystr;
    var parsedUrl = URL.parse(url, true);
    this.protocol = parsedUrl.protocol;
    this.host = parsedUrl.host;
    options.method = this.method;
    options.headers = this.headers;
    options.host = parsedUrl.host;
    options.hostname = parsedUrl.hostname;
    options.port = parsedUrl.port;
    options.path = parsedUrl.pathname + (querystr ? "?"+querystr : "");
    options.ca = this._ca;
    options.agent = this._agent;
    var req = this.req = protocols[parsedUrl.protocol].request(options);
    req.on('drain', function(){
        self.emit('drain');
    });
    req.on('error', function(e){
        self.emit('error',e);
        //if (self._aborted) return;
        //if (self.res) return;
        self.callback(e)
    });
    req.on('response',function (res){
        self.emit("response",res);
    });
    req.setTimeout(this._timeout,function(){
        req.abort();
        self.emit("timeout");
    });
    return req;
};
Proto.end = function (callback){
    var self = this;
    var req = this.request();
    callback && this.callback(callback);

    function fn(err,res,buffer){
        self.buffer = buffer;
        self.emit('end');
        err ? self.callback(err) : self.callback(null, res, buffer);
    }
    req.on('response',function (res){
        self.res = res;
        var redirect = utils.isRedirect(res.statusCode);
        var cookie = res.headers["set-cookie"];
        cookie && cookies.setCookie(self.host,cookie);

        if (self.piped) return;
        // redirect
        if (redirect && self._redirects++ != self._maxRedirects){
            return self.redirect(res);
        }
        if (utils.needUnzip(res)){
            utils.unzip(req, res);
        }
        parse(res,fn);
    });
    if (this.method === "POST"){
        var data = querystring.stringify(this._data);
        req.setHeader('Content-Length',data.length);
        req.write(data);
    }
    req.end();
    return this
};
Proto.promise = function (){
    var self = this;
    var times = 0,maxtimes = this._reconnect;
    var defer = function (resolve,reject){
        self.end(function(err,res,buffer){
            if (res && res.statusCode === 200 && buffer){
                var length = res.headers['content-length'];
                if (length){
                    if (buffer.length >= length){
                        resolve(buffer);
                    }else {
                        ++times < maxtimes ? self.end() : reject();
                    }
                }else {
                    resolve(buffer);
                }
            }else if (err){
                ++times < maxtimes ? self.end() : reject(err.code);
            }else {
                ++times < maxtimes ? self.end() : reject(res.statusCode);
            }
        });
    }
    return new Promise(defer);
};
Proto.then = function (success,fail){
    return this.promise().then(success,fail);
};



function get(url,data,fn){
    var req = new Request(url, 'GET');
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.query(data);
    if (fn) req.end(fn);
    return req;
};
function post(url,data,fn){
    var req = new Request(url, 'POST');
    if ('function' == typeof data) fn = data, data = null;
    if (data) req.send(data);
    if (fn) req.end(fn);
    return req;
};
function ajax(url, options){
    if ( typeof url === "object" ) {
        options = url;
        url = undefined;
    }
    options = options || {};
    options.url = url || options.url;
    options.method = options.method || "GET";
    options.timeout = options.timeout || 15000;
    var req = new Request(options.url, options.method);
    options.timeout && req.timeout(options.timeout);
    options.dataType && req.accept(options.dataType);
    options.data && req.send(options.data);
    options.contentType && req.type(options.contentType);
    options.headers && req.setHeader(options.headers);
    return req.setHeader("X-Requested-With","XMLHttpRequest").then(options.success,options.error);
}
//console.log(cookies)
module.exports = {
    Request : Request,
    get : get,
    post : post,
    ajax : ajax
}



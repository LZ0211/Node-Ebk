function Monitor(){
    this.init.apply(this,arguments);
}

Monitor.prototype.interval = 100;
Monitor.prototype.init = function (interval){
    this.interval = interval || this.interval;
    this.waiting = [];
    this.time = 0;
    this.loops = [];
    this.pools = [];
    this.counter = (function(){
        var count = 0;
        var counter = {
            valueOf:function (){return count},
            toString:function(){return count},
            add:function (){count += 1},
            sub:function (){count -= 1},
            zero:function(){count = 0}
        }
        return counter
    })();
    this.date = new Date();
    return this;
};
Monitor.prototype.listen = function (){
    var self = this;
    this.abort();
    this.timer = setInterval(function (){
        var date = new Date();
        if (date-self.date > 5000){
            self.date = date;
            self.filter();
        }
        self.loops.forEach(function (loop){
            var event = loop.event;
            if (typeof event !== "undefined"){
                if (typeof event === "function"){
                    event = event.apply(self);
                }
                if (event){
                    loop.call();
                    if (!loop.repeat){
                        loop.event = null;
                    }
                }
            }
        });
    },this.interval);
    this.date = new Date();
    return this;
};
Monitor.prototype.abort = function (){
    this.timer && clearInterval(this.timer);
    return this;
};
Monitor.prototype.clear = function (){
    this.abort();
    this.waiting.forEach(function (timer){
        if (!timer._called){
            clearTimeout(timer);
        }
    });
    this.waiting = [];
    this.time = 0;
    this.loops=[];
    this.pools = [];
    this.counter.zero();
    this.timer = null;
    return this;
};
Monitor.prototype.filter = function (){
    this.loops = this.loops.filter(function (loop){
        return loop.event
    });
};
Monitor.prototype.wait = function (fn,time){
    var self = this;
    this.waiting.push(setTimeout(function (){
        fn.call(self);
    },time));
    return this;
};
Monitor.prototype.next = function (fn,time){
    time = time || 0;
    this.time += time;
    var self = this;
    this.waiting.push(setTimeout(function (){
        self.time -= time;
        fn.call(self);
    },this.time));
    return this;
};
Monitor.prototype.when = function(event,call,repeat){
    this.loops.push({"event":event,"call":call,"repeat":repeat});
    if (!this.timer){this.listen();}
    return this;
};
Monitor.prototype.always = function (event,call){
    return this.when(event,call,true);
};
Monitor.prototype.until = function (event,call){
    return this.when(function (){
        if (typeof call === "function"){
            call();
        }
        if (typeof event === "function"){
            return event();
        }
        return event;
    },function(){});
};
Monitor.prototype.parallel = function (fns,most){
    var pools = this.pools,self=this;
    most = most || 3;
    if (pools.length === 0 && this.counter == 0){
        pools.push.apply(pools,fns);
        this.until(function(){
            return self.counter == 0 && pools.length == 0;
        },function (){
            if (self.counter < most && pools.length > 0){
                console.log(["正在监听队列，当前正在运行 ",self.counter," 个任务，剩余 ",pools.length," 个任务..."].join(""));
                pools.shift().call(null,self.counter);
            }
        });
    }else {
        pools.push.apply(pools,fns);
    }
    return this;
};
Monitor.prototype.queue = function (fns){
    return this.parallel(fns,1);
};

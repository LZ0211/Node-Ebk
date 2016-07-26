var querystring = require("querystring");
var fs = require("fs");
module.exports = function(dir){
    var database,stack=[];
    try{
        database = JSON.parse(fs.readFileSync(dir).toString());
    }catch (e){
        database = {};
    }
    process.on("exit",function (){
        fs.writeFileSync(dir,JSON.stringify(stack[0] || database,null,4));
    });
    function queryFn(string){
        var query = querystring.parse(string);
        var rules = [];
        for (var key in query){
            var val = query[key];
            if (val !== ""){
                if (!Array.isArray(val)){
                    val = [val];
                }
                val = val.map(function(v){
                    if (/^(\d+|true|false)$/.test(v) == false){
                        v = '"' + v + '"';
                    }
                    return ['record["', key, '"]==', v].join('');
                }).join(" || ");
                rules.push("(" + val + ")");
            }
        }
        return new Function("record","return " + rules.join("&&"));
    }
    function unique(array){
        var sorted = array.sort();
        var last = null;
        var arr = [];
        array.forEach(function(v){
            if(v && v !== last){
                last = v;
                arr.push(v);
            }
        });
        return arr;
    }
    return {
        localization:function(){
            fs.writeFileSync(dir,this.toString());
            return this;
        },
        load:function (db){
            database = db;
            return this;
        },
        select:function(fn){
            var res = {};
            for (var dir in database){
                var record = database[dir]
                if (fn(record)){
                    res[dir] = record;
                }
            }
            return this.push(res);
        },
        get:function(key){
            return database[key];
        },
        pop:function (){
            database = stack.pop();
            return this;
        },
        push:function (db){
            stack.push(database);
            return this.load(db);
        },
        origin:function (){
            while (stack.length){
                this.pop();
            }
        },
        not:function (string){
            return this.select(function (record){
                return !queryFn(string)(record);
            });
        },
        map:function(fn){
            var _db = {};
            for(var x in database){
                _db[x] = fn(database[x],x,database);
            }
            return _db;
        },
        each:function(fn){
            for(var x in database){
                fn(database[x],x,database);
            }
            return this;
        },
        query:function (string){
            return this.select(queryFn(string));
        },
        match:function (string){
            return this.select(item => Object.keys(item).map(k=>item[k]).join('').match(new RegExp(string)));
        },
        insert:function (name,record){
            database[name] = record;
            return this;
        },
        remove:function (name){
            delete database[name];
            return this;
        },
        slice:function(){
            var keys = [].slice.apply(this.keys(),arguments);
            var _db = {};
            keys.forEach(function(v,i){
                _db[v] = database[v];
            });
            database = _db;
            return this;
        },
        merge:function(name,record){
            if(!(name in database)){
                this.insert(name,record);
                return this;
            }
            var old = database[name];
            for(var key in record){
                if (!old[key] && record[key]){
                    old[key] = record[key];
                    continue;
                }
            }
            return this;
        },
        sync:function(db){
            var self = this;
            var data = db.data();
            db.keys().forEach(function(key){
                self.merge(key,data[key]);
            });
            return this;
        },
        keys:function(){
            return Object.keys(database);
        },
        attr:function(attr){
            var self = this;
            return unique(this.keys().map(function (name){
                return self.get(name)[attr];
            }));
        },
        pairs:function(){
            var self = this;
            return this.keys().map(function(v,i){
                return [v,self.get(v)];
            });
        },
        groupBy:function(attr){
            var logs = {};
            var attrs = this.attrs(attr);
            attrs.forEach(function(v){
                logs[v] = [];
            });
            this.toArray().forEach(function(record){
                logs[record[attr]].push(record);
            });
            return attrs.map(function(attr){
                return logs[attr];
            });
        },
        size:function(){
            return this.keys().length;
        },
        toArray:function(){
            var self = this;
            return this.keys().map(function(v){
                return self.get(v);
            });
        },
        toString:function (){
            this.origin();
            return JSON.stringify(database,null,4);
        },
        data:function (){
            return database;
        }
    }
}

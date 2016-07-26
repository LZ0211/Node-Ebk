"use strict"
class Cache{
    constructor(size){
        this.length = 0;
        this.size = (size || 5) * 1024 * 1024;
        this.capacity = this.size;
        this.Storage = {};
    }

    set(key,val){
        this.check();
        let buf = new Buffer(val);
        let now = new Date();
        let size = buf.length;
        this.Storage[key.toLowerCase()] = {
            _cache:buf,
            _time:+now,
            _size:size
        };
        this.size -= size;
        this.length += 1;
        return this;
    }

    get(key){
        let found = this.Storage[key.toLowerCase()];
        if (found)return found._cache.toString();
        return false;
    }

    clear(key){
        let found = this.Storage[key.toLowerCase()];
        this.size += found._size;
        this.length -= 1;
        delete this.Storage[key.toLowerCase()];
        return this;
    }

    check(){
        if (this.size < this.capacity/4){
            let keys = Object.keys(this.Storage);
            keys.sort((a,b) => this.Storage[a]._time - this.Storage[b]._time);
            while (this.size < this.capacity/2){
                this.clear(keys.shift());
            }
        }
        return this;
    }
}

module.exports = Cache;
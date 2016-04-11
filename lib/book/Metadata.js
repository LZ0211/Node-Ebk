var crypto = require('crypto');
function Metadata(title,author){
    if (title instanceof Metadata){
        return title;
    }
    if (title instanceof Object){
        var obj = new Metadata();
        return obj.merge(title,true);
    }
    this.title = title || "";
    this.author = author || "";
    this.date = new Date().toLocaleString();
    this.hash();
}
Metadata.prototype.set = function (key,value,overide){
    if (overide){
        this[key] = value;
    }else {
        if (!this[key] && this[key] !== 0){
            this[key] = value;
        }
    }
    this.hash();
}
Metadata.prototype.get = function (key){
    return this[key];
}

Metadata.prototype.hash = function (){
    this.id = crypto.createHash("md5").update(this.title + "-" + this.author).digest("hex");
    this.uuid = uuid(this.id);
}

Metadata.prototype.merge = function (obj,overide){
    for (var x in obj){
        this.set(x,obj[x],overide);
    }
    return this;
}


function uuid(hash){
    var lens = [8,4,4,4,12];
    var array = [],offset=0;
    lens.forEach(function (len){
        array.push(hash.substring(offset,offset+len));
        offset += len;
    });
    return array.join("-");
}

module.exports = Metadata;
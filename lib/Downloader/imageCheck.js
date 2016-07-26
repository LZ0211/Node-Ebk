function isJPG(buffer){
    return [0xff,0xd8].every(function (v,i){
        return buffer[i] == v;
    });
}
function isCompleteJPG(buffer){
    var len = buffer.length;
    return [0xd9,0xff].every(function (v,i){
        return buffer[len-i] == v;
    });
}

function isBMP(buffer){
    return [0x4D,0x42].every(function (v,i){
        return buffer[i] == v;
    });
}

function isGIF(buffer){
    var header = buffer.slice(0,6).toString();
    return header == "GIF89a" || header == "GIF87a";
}

function isTGA(buffer){
    return [[0x00,0x00,0x02,0x00,0x00],[0x00,0x00,0x01,0x00,0x00]].some(function (head){
        return head.every(function (v,i){
            return buffer[i] == v;
        })
    });
}

function isPNG(buffer){
    return [0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A].every(function (v,i){
        return buffer[i] == v;
    });
}

function isTIFF(buffer){
    return [[0x4D,0x4D],[0x49,0x49]].some(function (head){
        return head.every(function (v,i){
            return buffer[i] == v;
        })
    });
}

function isComplete(buffer){
    if (){
    }
}
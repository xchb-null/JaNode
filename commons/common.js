/**
 * 根据请求路径决定响应的content-Type
 * @param {*} path 
 */
function checkContenType(path) {

    var sub = path.substring(path.lastIndexOf('\.') + 1, path.length);
    switch (sub) {
        case "css":
            return "text/css";
        case "js":
            return "text/javascript";
        case "html":
            return "text/html";
        case "jpg":
            return "image/webp,image/apng,image/*,*/*";
        case "png":
            return "image/webp,image/apng,image/*,*/*";
        default:
            return "text/html";
    }
}


exports.checkContenType = checkContenType;
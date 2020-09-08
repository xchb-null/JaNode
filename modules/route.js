/**
 * 路由配置
 */
const url = require('url');
const fs = require('fs');
const config = require('../commons/config.js');
const path = require("path");
const { SendHttpMsg } = require('../commons/httputils.js');

const AppRoute = {
    GET: {},
    POST: {}
}

//404错误信息
const NotFindErrorContent = '<div style="margin-top:39px;text-align:center;">' +
    '<h2>404  Resources Not Find </h2><hr/>' +
    '<h4 style="font-family: cursive;">JaNode/1.0.0</h4>' +
    '</div>';
//505 错误信息
const ServerInnerErrorContent = '<div style="margin-top:39px;text-align:center;">' +
    '<h2>505 服务器内部错误</h2><hr/>' +
    '<h4 style="font-family: cursive;">JaNode/1.0.0</h4>' +
    '</div>';

//初始化配置信息
const SERVER_PORT = config.get("port");
const SERVER_ROOT_PATH = config.get("root_path");


/**
 * 主函数（资源映射、转发）
 * @param {*} request 
 * @param {*} response 
 */
AppRoute.start = function(request, response) {
    try {
        //一、优先匹配静态资源
        //获取请求路径
        let urlPath = url.parse(request.url, true).pathname;
        urlPath = urlPath == "/" ? "/index.html" : urlPath;
        //文件路径
        let filePath = SERVER_ROOT_PATH + urlPath;
        if (fs.existsSync(filePath)) {
            //根据请求文件名设置对应的响应头
            response.writeHead(200, { 'Content-Type': checkContenType(urlPath) });
            //获取文件并输出
            fs.readFileSync(filePath, (err, data) => {
                if (!err) {
                    //匹配到静态资源，返回结果
                    response.write(data);
                    response.end();
                    return;
                }
            });
        }
        //二、对post、get方法映射
        if (request.method == 'GET') {
            methodHandler(AppRoute.GET, urlPath, request, response);
        } else if (request.method == 'POST') {
            methodHandler(AppRoute.POST, urlPath, request, response);
        } else {
            SendHttpMsg(response, "该请求方式暂不支持: " + request.method);
        }
    } catch (e) {
        SendHttpMsg(response, ServerInnerErrorContent + "<a href='javascript:void(0)'>" + e + "</a>");
    }
}

/**
 * 添加get方法
 * @param {} path 
 * @param {*} handler 
 */
AppRoute.get = function(path, handler) {
        AppRoute.GET[path] = handler;
    }
    /**
     * 添加post方法
     * @param {}} path 
     * @param {*} handler 
     */
AppRoute.post = function(path, handler) {
    AppRoute.POST[path] = handler;
}


/**
 * 方法处理器
 * @param {*} methodObj 
 * @param {*} urlPath 
 * @param {*} request 
 * @param {*} response 
 */
function methodHandler(methodObj, urlPath, request, response) {
    let handler = methodObj[urlPath];
    if (handler != undefined) {
        handler(request, response);
        response.end();
    } else {
        SendHttpMsg(response, NotFindErrorContent + "<a href='javascript:void(0)'>找不到该资源，请检查后重新输入: " + urlPath + "</a>");
    }
}


/**
 * 根据请求路径决定响应的content-Type
 * @param {*} path 
 */
function checkContenType(urlPath) {
    //解析出文件后缀名
    var sub = path.extname(urlPath).replace(".", "");
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

exports.route = AppRoute;
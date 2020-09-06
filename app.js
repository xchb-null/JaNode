const http = require('http');
const url = require('url');
const fs = require('fs');
const common = require('./commons/common.js');
const config = require('./commons/config.js');


//初始化配置信息
const SERVER_PORT = config.get("port");
const SERVER_ROOT_PATH = config.get("root_path");


http.createServer(function(request, response) {
    //获取请求路径
    let path = request.url;
    path = path == "/" ? "/index.html" : path;
    //根据请求文件名设置对应的响应头
    response.writeHead(200, { 'Content-Type': common.checkContenType(path) });
    //获取文件并输出
    fs.readFile(SERVER_ROOT_PATH + path, (err, data) => {
        if (err) {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.write('<div style="margin-top:39px;text-align:center;">' +
                '<h2>404  Resources Not Find </h2><hr/>' +
                '<h4><i>Node.js/1.0.0</i></h4>' +
                '</div>');
            response.end();
            return;
        }
        response.write(data);
        response.end();
    });
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
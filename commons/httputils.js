function SendHttpMsg(response, content) {
    response.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });
    response.write(content);
    response.end();
}

exports.SendHttpMsg = SendHttpMsg;
const http = require('http');
const { route } = require('./modules/route.js');



http.createServer(function(request, response) {
    route.get('/hello', (request, response) => {
        response.write("hello");
    });
    route.post('/one', (request, response) => {
        response.write("one");
    });
    route.start(request, response);
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
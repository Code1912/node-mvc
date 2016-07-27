/**
 * Created by Code1912 on 2016/7/26.
 */
var http=require("http");
url = require("url");
http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
     console.log(url.parse(req.url));
    console.log(url.parse(req.url).pathname);
    // 发送响应数据 "Hello World"
    res.end('Hello World\n');
}).listen(888);
console.log("server started.")
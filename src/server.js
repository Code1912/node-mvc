/**
 * Created by Code1912 on 2016/7/26.
 */
let http=require("http");
let url = require("url");
let querystring = require("querystring");
let route=require("./route");
let controllerContext=require("./controllerContext").controllerContext;
let errorHandler=require("./systemErrorHandler").errorHanddler;
let staticSourcehandler=require('./staticSourceHandler');
let config = require('./routeConfig');
exports.run = function(port) {
    port = port || 8888;
    http.createServer(function (req, res) {
        let _postData = '';
        req.on('data', function (chunk) {
            _postData += chunk;
        }).on('end', function () {
                req.post = querystring.parse(_postData);
                handlerRequest(req, res);
            });
    }).listen(port);
};

 function handlerRequest(req, res){
    var actionInfo = route.getAction(req.url, req.method);
    if(actionInfo.action){
        var controller = require('./controllers/'+actionInfo.controller); // ./controllers/blog
        if(controller[actionInfo.action]){
            var ct = new controllerContext(req, res);
            controller[actionInfo.action].apply(ct, [actionInfo.args]);
        }else{
            errorHandler.error500(res, `Error: controller ${actionInfo.controller} without action ${actionInfo.action } `)
        }
    }else{
        staticSourcehandler.response(req.url, res);
    }
};
/**
 * Created by Code1912 on 2016/7/27.
 */
let path=require('path');
var ejs=require('ejs') ;
let errorHandler=require("./systemErrorHandler");
let viewEngine={
     render:function (req, res, viewName, context) {
        try{
           ejs.renderFile(`${__dirname}/views/${viewName}.ejs`,context,{},function (err, str) {
               if(err){
                   errorHandler.error500(res, err);
                   return;
               }
               res.writeHead(200, {'Content-Type': ' text/html'});
               res.write(str);
               res.end();
           })

        }catch(err){
            errorHandler.error500(  res, err);
        }
    }
    ,renderJson:function(res, json){
        try {
            res.writeHead(200, {'Content-Type': 'json'});
            res.write(json);
            res.end();
        }catch(err){
            errorHandler.error500( res, err);
        }
    }
};

exports.viewEngine=viewEngine;

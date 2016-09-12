/**
 * Created by Code1912 on 2016/7/27.
 */
let errorHandler=require("./systemErrorHandler");
let viewEngine=require('./viewEngine').viewEngine;
let controllerContext=function (req, res) {
    this.req=req;
    this.res=res;
    this.errorHanddler=errorHandler.errorHanddler;
};

controllerContext.prototype.render=function (viewName, context) {
   viewEngine.render(this.req, this.res,viewName,context);
};
controllerContext.prototype.renderJson = function(json){
    viewEngine.renderJson(this.req, this.res, json);
};
exports.controllerContext=controllerContext;
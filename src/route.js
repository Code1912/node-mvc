/**
 * Created by Code1912 on 2016/7/27.
 */
var parseURL = require('url').parse;

const routerMap={
    get:[],
    post:[],
    head:[],
    put:[],
    delete:[]};
/*
router(
method:[]||""
controller:"controller",
action:"actionName",
parameter:"id/name/date"
)
 */
function router(method,controller,action,parameters) {
    if(!controller||!method){
        return;
    }
    if(Array.isArray(method)){
        method.forEach(p=>{
            register(p,controller,action,parameters)
        })
       return;
    }
    register(method,controller,action,parameters)
}

function register(method,controller,action,parameters) {
    routerMap[method.toLocaleLowerCase()].push({
        controller:controller,
        action:action||"",
        parameters:parameters
    })
}

function getAction(url,method) {
    var actionInfo = {controller:null, action:null, args:null};
      method = (method || "get").toLocaleLowerCase();
    let urlObj = parseURL(url, true);
    let pathName = urlObj.pathname;
    let parameters = urlObj.query;
    let methodArray = routerMap[method];

    methodArray.forEach(item=> {
        if(pathName=="/"){
            item=methodArray.find(p=>p.controller.toLocaleLowerCase()=="index"&&p.action.toLocaleLowerCase()=="index");
            if(!item){
                throw new Error("please add index controller and index action")
            }
            actionInfo.controller=item.controller;
            actionInfo.action=item.action;
            actionInfo.args=item.parameters;
            return false;
        }
        let tempUrl = new RegExp(`/${item.controller}/${item.action||""}`);
        if(tempUrl.exec(pathName)){
            actionInfo.controller=item.controller;
            actionInfo.action=item.action;
            actionInfo.args=item.parameters;
            return false;
        }
    })
    if(actionInfo.controller&& actionInfo.args){
        let argUrl=pathName.replace(`/${actionInfo.controller}/${actionInfo.action}`,'').replace("/","");
        let argArray=(argUrl.split("/")||[]);
        let parameterNameArray= actionInfo.args.split("/")||[];
        if(parameterNameArray.length>0){
            let i=0;
            parameterNameArray.forEach(p=>{
                if(i<argArray.length){
                     parameters[p]=argArray[i];
                }
                else {
                    parameters[p]=null;
                }
                i++;
            })
        }
    }
    actionInfo.args=parameters;
    return actionInfo;
}

exports.router=router;
exports.getAction=getAction;

/**
 * Created by Code1912 on 2016/7/27.
 */
if(!String.prototype.format)
{
    String.format= String.prototype.format = function(args) {
        let result = this;
        if (arguments.length > 0) {
            if (arguments.length == 1 && typeof (args) == "object") {
                for (let key in args) {
                    if(args[key]!=undefined){
                        let reg = new RegExp("({" + key + "})", "g");
                        result = result.replace(reg, args[key]);
                    }
                }
            }
            else {
                for (let i = 0; i < arguments.length; i++) {
                    if (arguments[i] != undefined) {
                        //let reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                        let reg= new RegExp("({)" + i + "(})", "g");
                        result = result.replace(reg, arguments[i]);
                    }
                }
            }
        }
        return result;
    }
}
if(!Array.prototype.find) {
    Array.find= Array.prototype.find =function (fn) {
        for (let i = 0; i < this.length; i++) {
            if (fn(this[i]))
                return this[i];
        }
        return null;
    }
}
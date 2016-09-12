/**
 * Created by Code1912 on 2016/9/12.
 */

exports.index=function(args) {
    this.render("index/index",{test:"Test asdfasfdasfd",id:args.id,name:args.name})
}
exports.test=function(args) {
    this.render("index/test",{test:"1111111",id:args.id,name:args.name})
}
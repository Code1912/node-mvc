/**
 * Created by Code1912 on 2016/7/27.
 */
function error404(res,err) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write(err.toString())
    res.end();
};
function error500(res,err) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write(err.toString())
    res.end();
};
exports.error404=error404;
exports.error500=error500;
exports.errorHanddler={
    error404:error404,
    error500:error500
}
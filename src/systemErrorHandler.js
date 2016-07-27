/**
 * Created by Code1912 on 2016/7/27.
 */
function error404(res) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.end();
};
function error500(res) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end();
};
exports.error404=error404;
exports.error500=error500;
/**
 * Created by Code1912 on 2016/7/27.
 */
let common=require('./common');
let errorHandler=require("./systemErrorHandler");
let path=require("path");
let fs=require("fs");
let url = require("url");
let fileTypeExtensionMap= {
    '.ai': 'application/postscript',
    '.aif': 'audio/x-aiff',
    '.aifc': 'audio/x-aiff',
    '.aiff': 'audio/x-aiff',
    '.asc': 'text/plain',
    '.au': 'audio/basic',
    '.avi': 'video/x-msvideo',
    '.bcpio': 'application/x-bcpio',
    '.bin': 'application/octet-stream',
    '.bmp': 'image/bmp',
    '.cdf': 'application/x-netcdf',
    '.class': 'application/octet-stream',
    '.cpio': 'application/x-cpio',
    '.cpt': 'application/mac-compactpro',
    '.csh': 'application/x-csh',
    '.css': 'text/css',
    '.dcr': 'application/x-director',
    '.dir': 'application/x-director',
    '.djv': 'image/vnd.djvu',
    '.djvu': 'image/vnd.djvu',
    '.dll': 'application/octet-stream',
    '.dms': 'application/octet-stream',
    '.doc': 'application/msword',
    '.dvi': 'application/x-dvi',
    '.dxr': 'application/x-director',
    '.eps': 'application/postscript',
    '.etx': 'text/x-setext',
    '.exe': 'application/octet-stream',
    '.ez': 'application/andrew-inset',
    '.gif': 'image/gif',
    '.gtar': 'application/x-gtar',
    '.hdf': 'application/x-hdf',
    '.hqx': 'application/mac-binhex40',
    '.htm': 'text/html',
    '.html': 'text/html',
    '.ice': 'x-conference/x-cooltalk',
    '.ief': 'image/ief',
    '.iges': 'model/iges',
    '.igs': 'model/iges',
    '.jpe': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.js': 'application/x-javascript',
    '.kar': 'audio/midi',
    '.latex': 'application/x-latex',
    '.lha': 'application/octet-stream',
    '.lzh': 'application/octet-stream',
    '.m3u': 'audio/x-mpegurl',
    '.man': 'application/x-troff-man',
    '.me': 'application/x-troff-me',
    '.mesh': 'model/mesh',
    '.mid': 'audio/midi',
    '.midi': 'audio/midi',
    '.mif': 'application/vnd.mif',
    '.mov': 'video/quicktime',
    '.movie': 'video/x-sgi-movie',
    '.mp2': 'audio/mpeg',
    '.mp3': 'audio/mpeg',
    '.mpe': 'video/mpeg',
    '.mpeg': 'video/mpeg',
    '.mpg': 'video/mpeg',
    '.mpga': 'audio/mpeg',
    '.ms': 'application/x-troff-ms',
    '.msh': 'model/mesh',
    '.mxu': 'video/vnd.mpegurl',
    '.nc': 'application/x-netcdf',
    '.oda': 'application/oda',
    '.pbm': 'image/x-portable-bitmap',
    '.pdb': 'chemical/x-pdb',
    '.pdf': 'application/pdf',
    '.pgm': 'image/x-portable-graymap',
    '.pgn': 'application/x-chess-pgn',
    '.png': 'image/png',
    '.pnm': 'image/x-portable-anymap',
    '.ppm': 'image/x-portable-pixmap',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.ps': 'application/postscript',
    '.qt': 'video/quicktime',
    '.ra': 'audio/x-realaudio',
    '.ram': 'audio/x-pn-realaudio',
    '.ras': 'image/x-cmu-raster',
    '.rgb': 'image/x-rgb',
    '.rm': 'audio/x-pn-realaudio',
    '.roff': 'application/x-troff',
    '.rpm': 'audio/x-pn-realaudio-plugin',
    '.rtf': 'text/rtf',
    '.rtx': 'text/richtext',
    '.sgm': 'text/sgml',
    '.sgml': 'text/sgml',
    '.sh': 'application/x-sh',
    '.shar': 'application/x-shar',
    '.silo': 'model/mesh',
    '.sit': 'application/x-stuffit',
    '.skd': 'application/x-koan',
    '.skm': 'application/x-koan',
    '.skp': 'application/x-koan',
    '.skt': 'application/x-koan',
    '.smi': 'application/smil',
    '.smil': 'application/smil',
    '.snd': 'audio/basic',
    '.so': 'application/octet-stream',
    '.spl': 'application/x-futuresplash',
    '.src': 'application/x-wais-source',
    '.sv4cpio': 'application/x-sv4cpio',
    '.sv4crc': 'application/x-sv4crc',
    '.swf': 'application/x-shockwave-flash',
    '.t': 'application/x-troff',
    '.tar': 'application/x-tar',
    '.tcl': 'application/x-tcl',
    '.tex': 'application/x-tex',
    '.texi': 'application/x-texinfo',
    '.texinfo': 'application/x-texinfo',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
    '.tr': 'application/x-troff',
    '.tsv': 'text/tab-separated-values',
    '.txt': 'text/plain',
    '.ustar': 'application/x-ustar',
    '.vcd': 'application/x-cdlink',
    '.vrml': 'model/vrml',
    '.wav': 'audio/x-wav',
    '.wbmp': 'image/vnd.wap.wbmp',
    '.wbxml': 'application/vnd.wap.wbxml',
    '.wml': 'text/vnd.wap.wml',
    '.wmlc': 'application/vnd.wap.wmlc',
    '.wmls': 'text/vnd.wap.wmlscript',
    '.wmlsc': 'application/vnd.wap.wmlscriptc',
    '.wrl': 'model/vrml',
    '.xbm': 'image/x-xbitmap',
    '.xht': 'application/xhtml+xml',
    '.xhtml': 'application/xhtml+xml',
    '.xls': 'application/vnd.ms-excel',
    '.xml': 'text/xml',
    '.xpm': 'image/x-xpixmap',
    '.xsl': 'text/xml',
    '.xwd': 'image/x-xwindowdump',
    '.xyz': 'chemical/x-xyz',
    '.zip': 'application/zip',
    '.woff': 'application/x-font-woff',
    '.woff2': 'application/x-font-woff',
    '.svg': 'image/svg+xml',
    '.otf': 'application/x-font-opentype',
    '.eot': 'application/vnd.ms-fontobject',
    '.ttf': 'application/x-font-truetype',
    '.ico': 'image/x-icon'
};
let parseURL=require("url").parse;
let favicon="/favicon.ico";
let iconData=null;

 function handler(url, res) {
     if(url===favicon)
     {
         readFavicon(res);
         return true;
     }
     var urlObj=parseURL(url, true);
     var lastFilePath=`${__dirname}/${urlObj.path}`;
     fs.exists(lastFilePath, function(exists) {
         if (exists) {
             response(lastFilePath,res);
             return;
         }
         errorHandler.error404(res,`can't find file${urlObj.path}`);
     });
};

function response(filePath,res) {
    let fileType = path.extname(filePath).toLocaleLowerCase();
    //console.log(filePath);
    fs.readFile(filePath,function (err, data) {
        if (err) {
            errorHandler.error500(res,err);
            console.log(err)
            return;
        }
        res.writeHead(200, {'Content-Type': fileTypeExtensionMap[fileType]});
        res.end(data);
    });
}

function readFavicon(res){
    if(iconData)
    {
        res.writeHead(200, {'Content-Type': fileTypeExtensionMap[".ico"]});
        res.end(iconData);
        return;
    }
    var filePath=  `${__dirname}/${favicon}`;
    fs.readFile(filePath, function (err, data) {
        if (err)
        {
            res.writeHead(200, {'Content-Type': fileTypeExtensionMap[".ico"]});
            res.end();
            console.log(err);
            return;
        }
        iconData=data;
        res.writeHead(200, {'Content-Type': fileTypeExtensionMap[".ico"]});
        res.end(data);
    });
}
exports.response=handler;

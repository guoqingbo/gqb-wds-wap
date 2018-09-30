var http = require('http');
var qs = require('querystring');
var config = require('../../config/index');

var common = {
    postOption:{
        host: config.api.host,
        port: config.api.port,
        path: '',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': reqData.length
        }
    },
    post:function (reqData,success) {
        var options = common.postOption;
        var params = reqData.params;
        options.path = reqData.path
        var req = http.request(options, function(res) {
            // res.setEncoding('utf8');
            res.on('data', function (data) {
                var data = JSON.parse(data);
                success(data)
            });
        });
        req.on('error', function(e){
            console.log("auth_user error: " + e.message);
        });
        req.write(qs.stringify(params));
        req.end();
    },
}
module.exports = {
    //景区游客数量
    getParkUserInfo:function(req,success){
        var reqData={
            path:'/api/Main/GetParkUserInfo',
            params:{
                BDATE:req.bDate,
                EDATE:req.eDate,
                PARKCODE :config.api.parkcode,
            }
        };
        common.post(reqData,success)
    },
    //登录查询（验证查询码）
    getQuery:function(req,success){
        var reqData={
            path:'/api/Main/GetQuery',
            params:{
                QueryCode :req.QueryCode,
            }
        };
        common.post(reqData,success)
    },
}


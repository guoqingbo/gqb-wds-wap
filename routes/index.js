var http = require('http');
var config = require("../config/index")
var api = require("./api/index");

var commmon = {
    getDate: function () {
        var myDate = new Date();
        var fullYear = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        if (month.toString().length < 2) {
            month = "0" + month
        }
        var day = myDate.getDate();
        if (day.toString().length < 2) {
            day = "0" + day
        }
        var bDate = fullYear + "-" + month + "-" + day + " 00:00:00"
        var eDate = fullYear + "-" + month + "-" + day + " 23:59:59"
        var timePickerShow = fullYear + "/" + month + "/" + day + " - " + fullYear + "/" + month + "/" + day;
        return {
            bDate: bDate,
            eDate: eDate,
            timePickerShow: timePickerShow
        }
    },
    config: {
        url: "http://" + config.api.host + ":" + config.api.port,
    },
}
module.exports = function (app) {
    app.get('/', function (req, res, next) {
        return res.render('loader-query/login', {url: commmon.config.url});
    });
    //登录查询（验证查询码）
    app.post('/getQuery', function (req, res) {
        var params = {
            QueryCode :req.body.QueryCode,
        }
        api.getQuery(params, function (data) {
            if (data.isSuc) {
                req.session.checkQueryCode = 1; // 登录成功，设置 session
            }else{
                req.session.checkQueryCode = 0
            }
            return res.json(data);
        })
    });
    app.get('/show', function (req, res, next) {
        if (req.session.checkQueryCode !== 1) {
            return res.redirect('/');
        }
        var params = commmon.getDate();
        api.getParkUserInfo(params, function (data) {
            return res.render('loader-query/show', {
                data: data.data[0],
                url: commmon.config.url,
                timePickerShow: params.timePickerShow,
                parkcode: config.api.parkcode
            });
        })
    });
};


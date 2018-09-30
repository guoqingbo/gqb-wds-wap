var env = process.env.NODE_ENV || 'production';
var config = {
    dev:{
        api:{
            host : "192.168.66.175",
            port : 9088,
            parkcode : "001001",
        },
        redis:{
            host: "192.168.0.178",
            port: 6379,
        }
    },
    test:{
        api:{
            host : "61.184.79.233",
            port : 8088,
            parkcode : "000002",
        },
        redis:{
            host: "192.168.0.178",
            port: 6379,
        }
    },
    prod:{
        api:{
            host : "61.184.79.233",
            port : 8088,
            parkcode : "000002",
        },
        redis:{
            host:"sendinfo.redis.com",
            port:6379
        },
    },
}
var configEnv = {}
if (env === 'production') {
     configEnv = config.prod
}else if(env === 'test'){
     configEnv = config.test
}else if(env === 'develpment'){
     configEnv = config.dev
}
module.exports = configEnv


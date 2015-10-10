if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'development';

var http = require('http'),
    redis = require('redis'),
    io = require('socket.io')
;

var config = require('./config')[process.env.NODE_ENV],
    redisCache = redis.createClient(config.redis.cache.port, config.redis.cache.host, {return_buffers: true})
;

redisCache.select(4);

var socket = io(process.argv[2] || 8080);

module.exports = {
    io: socket,
    redisCache: redisCache
};

require('./sockets/router')(socket);





console.log('hello world');
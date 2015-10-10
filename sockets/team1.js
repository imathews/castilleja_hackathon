var teamName = 'team1';

module.exports = function(socket) {
	console.log('connected!!')
	var redis = require('../app').redisCache;

	socket.on('set', function(data, done){
		console.log('setting!!')

		for (var k in data){
			if (data.hasOwnProperty(k)){
				data[k] = JSON.stringify(data[k]);
			}
		}
		redis.hmset(teamName, data, done);
	});

	socket.on('get', function(key, done){
		redis.hget(teamName, key, function(err, value){
			done(err, JSON.parse(value));
		})
	});

	socket.on('delete', function(key, done){
		redis.hdel(teamName, key, function(err){
			done(err);
		})
	});
};
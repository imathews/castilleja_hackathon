window.castaHacks = {};

var domain = 'http://staging.redivis.com';
var onSocketLoadQueue = [];

var emptyFn = function(){};
var socket = io.connect(domain + '/team1');

socket.on('connect', function(){
	console.log('Connected to server...');
	onSocketLoadQueue.forEach(function(fn){fn();});
	onSocketLoadQueue.length = 0;
});

function onSocketLoad(fn){
	if (socket.connected){
		fn();
	}
	else{
		onSocketLoadQueue.push(fn);
	}
}

castaHacks.set = function(obj, cb){
	cb = cb || emptyFn;
	onSocketLoad(function(){
		socket.emit('set', obj, cb);
	});
};

castaHacks.get = function(key, cb){
	cb = cb || emptyFn;
	onSocketLoad(function(){
		socket.emit('get', key, cb);
	});
};

castaHacks.delete = function(key, cb){
	cb = cb || emptyFn;
	onSocketLoad(function(){
		socket.emit('delete', key, cb);
	});
};
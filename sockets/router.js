

module.exports = function(io){

    io.of('/team1').on('connection', require('./team1'));
};

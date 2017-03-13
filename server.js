var express = require('express');
var path = require('path');
var ejs = require('jade');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var port = 3000;
var index = require('./routes/index');
var chat = require('./routes/chat');

var app = express();

app.use(express.static('public'));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/chat', chat);
app.use('/', index);

var check = app.listen(port, function() {
	console.log("Server start at port " + port);
});

var io = socketio.listen(check);
io.on('connection', function(socket) {
    console.log('a user connected');
	socket.on('chat', function(message) {
		var d = new Date();
		var day;
		if(d.getMinutes<10) 
			day = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' '+d.getHours()+':0'+d.getMinutes();
		else 
			day = d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
		message = message+'//'+day;
        console.log(message);
		io.emit('chat', message);
    });
});

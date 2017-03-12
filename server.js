var express = require('express');
var path = require('path');
var ejs = require('jade');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var port = 3000;

var app = express();

app.use(express.static('public'));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine','jade')

app.get('/',function(req, res){
	res.render('index');
});

app.get('/about',function(req, res){
	res.render('about');
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.post('/chat',function(req, res){
	console.log(req.body.user.name+' has login')
	res.render('chat')
});

var check = app.listen(port, function() {
	console.log("Server start at port " + port);
});

var io = socketio.listen(check);
io.on('connection', function(socket) {
    console.log('a user connected');
});

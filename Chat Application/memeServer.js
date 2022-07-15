var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
console.log('Server is running ');

memers = []; //users array
memeConnections = []; //connections array




app.get("/", function(req, res){
	res.sendFile(__dirname + "/memeChat.html"); //links to html file CHANGE /index.html to you actually html file
	
});
	
io.sockets.on("connection", function(socket){
	//connection stuff
	memeConnections.push(socket);
	console.log("Memers connected: %s", memeConnections.length);
	
	// disconnection stuff
	socket.on("disconnect", function(data){
		
		memers.splice(memers.indexOf(socket.username), 1); //accessing the array memers
		
		
	memeConnections.splice(memeConnections.indexOf(socket),1);
	console.log("Memers disconnected: %s ", memeConnections.length);
	});
	
	//send dem meme messages
	socket.on("send meme message", function(data){ 
		console.log(data);// shows what the memers typed in console
		io.sockets.emit("new meme message", {msg: data});
	});
});


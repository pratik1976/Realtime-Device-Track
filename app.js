const express = require('express'); //This imports the Express framework, a lightweight and flexible Node.js web application framework that provides robust tools for creating APIs and handling HTTP requests.
const app = express(); //Here, we initialize an instance of Express by calling the express() function. This instance (app) will be used to define routes, middleware, and other functionalities for the server.
const path = require("path");

const http = require("http");  //http  module allows for the creation of an HTTP server. socketio runs on http server. so we need to create its server

const socketio = require("socket.io"); //socket.io is a library that enables real-time, bidirectional, and event-based communicaton between clients and server
const server = http.createServer(app); //A new http server is created by passing the app to http.createServer(). This server can handle HTTP requests and responses
const io = socketio(server); //io is created by initializing socket.io with the server object, allowing the application to use WebSocket features on the server and establish real-time connections with clients.

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location", {id: socket.id, ...data});
    });

    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id);
    });

    console.log("connected");
});

app.get("/", function(req,res){   //we create a route
    res.render("index");
});

server.listen(3000);  //to listen at a particular route
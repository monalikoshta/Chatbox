const express= require("express")
const app=express()

var port=3000

app.use(express.static(__dirname))

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var connections=[]
var users=[]

io.sockets.on("connection",(socket) =>{
    connections.push(socket)
    // console.log(socket)
    // console.log("a user is connected: "+connections.length)
    socket.on('new user',(message)=>{
        io.sockets.emit('new user',{
            name:message.name
        })
    })

    socket.on('disconnect',(message)=>{
    	io.sockets.emit('disconnect',{
    		name: message.name
    	})
        connections.splice(connections.indexOf(socket),1)
    })

    socket.on('sending message',(message)=>{
        //console.log(error)
        // console.log("msg is received: "+message.name)

        io.sockets.emit('new message',{
            name:message.name,
            msg: message.msg
        })
    })
})

app.get('/',(req,res)=>{
    res.send()
})
server.listen(port,()=>{
    console.log("up to the port",port)
})
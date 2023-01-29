const express = require('express')
const app = express()
const port = 3001
const http = require('http')
const cors = require('cors')
const {Server} = require("socket.io")
const server = http.createServer(app)
app.use(cors())

const io = new Server(server,{
    cors:{
        origin:'*',
        methods:["GET","POST","PUT","DELETE"]
    }
})


io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User of ID ${socket.id} joined in room ${data}`);
    })

    socket.on("send_message",(data)=>{
        // console.log(data);
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on('disconnect',()=>{
        console.log(`User disconnected ${socket.id}`);
    })
})


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

server.listen(port, () => {
  console.log(`Example app listening on port 3000`)
})
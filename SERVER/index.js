require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)

//constants
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(express.json());


//serve

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public/board.html")
})
app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+"/public/admin.html")
})

//connection
io.on('connection',(socket)=>{
  console.log(`new connection established ${socket.id}`);
  socket.on('disconnect',()=>{
    console.log("Connection disconnected");
  })
// receving message from admin
socket.on('data',(msg)=>{
    // broadcast message to board
io.emit('board_data',msg)

})


})


//server responses 
http.listen(PORT,()=>{
console.log(`server running on ${PORT}`);
})
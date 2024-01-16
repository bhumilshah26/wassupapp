const { log } = require('console')
const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

// listening to the port
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//static is smiddleware
app.use(express.static(__dirname + '/public'))

// creating a route (you want to send the index file)
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// after this you wrote a script in package.json
// "scripts": {
// "dev": "nodemon server" ---> server is the file name 
//   },


// Socket

// socket server ko pata chale ki kaunse server pe kaam karna h
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    // jo emit kia woh isten karna h(jo naam diya tha emit mein)
    // broadcast mtlb jitne clients ye server se connected h unko bhej
    socket.on('message',(msg) => {
        socket.broadcast.emit('message', msg)
    });
});
require('./config')
require('./db/index.js')
const { PORT } = process.env
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const { authRoutes, userRoutes, chatRoutes } = require('./routes')
const cors = require('cors')
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

app.use(cors());

// SERVER BUILD
app.use(express.static('client/build'));

//Session routes
app.use('/api/auth', authRoutes)

//User routes
app.use('/api/user', userRoutes)

//Chat routes
app.use('/api/chats', chatRoutes)

//Socket io

require('./socketio')(io)

http.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
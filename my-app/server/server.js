const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./User');
const model = require('./model');
const Chat = model.getModel('chat');
const app = express();

// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', function (socket) {
  console.log('user is login');
  socket.on('sendmsg', function (data) {
    console.log(data);
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit('recmsg', Object.assign({}, doc._doc))
    })
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, function () {
  console.log('Node app start at port 9093')
})
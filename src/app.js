const express = require('express');
const RoutesConfig = require('./config/routes.config.js');
const path = require('path');
const DatabaseDriver = require('./config/db/mongoose.db.js');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');



const PORT = process.env.PORT || 3080;
const app = express();


//connecting to DataBase
DatabaseDriver();

app.set('view engine', 'ejs');
//setting up views for ejs
app.set('views', path.join(__dirname, '../client/pages'));
//setting up partials for ejs
app.set('partials', path.join(__dirname, '../client/components'));
app.use(express.static(path.join(__dirname, '../client/public')));

//Tells express to parse the json data coming, into an object and be accessable via request.body
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RoutesConfig(app);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const io = socketIO(server);

let userCounter = 0;
//sucket.io listening to user connection and making a counter
io.on('connection', (socket) => {
    userCounter++;
    io.emit('userCounter', userCounter);
    socket.on('disconnect', () => {
        userCounter--;
        io.emit('userCounter', userCounter);
    });
});

module.exports = { app, server };
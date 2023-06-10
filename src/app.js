const express = require('express');
const RoutesConfig = require('./config/routes.config.js');


const PORT = 3080 || process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
//Tells express to parse the json data coming, into an object and be accessable via request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RoutesConfig(app);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

async function connct(){
    try{
        const connected = await connectDB(url);
        console.log('Connected to DataBase!');

        return connected.connection.readyState === 1;
    }catch(e) {
        console.log(`Failed connection to MongoDB: ${e.message}`);
    }
}

async function connectDB(url){
    console.log(`Connecting to DataBase ${url}`);
    return mongoose.connect(url, {
        useNewUrlParser: true,
    });
}


//closing the DataBase if node process is terminated
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Database connection closed due to NodeJs process termination');
        process.exit(0);
    });
});

module.exports = connct;
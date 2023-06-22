const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

class DatabaseDriver {
    constructor(){};

    connect() {
        try{
            const connected = connectDB(url);
            console.log('Successfully connected to database');

            return connected.connection.readyState == 1;
        }catch(e) {
            console.log(`Failed connection to Database: ${e.message}`)
        }
    };

    async connectDB(urlString) {
        console.log(`Connecting to Database ${urlString}`);
        return mongoose.connect(urlString, {
            useNewUrlParser: true, //using this to avoid deprrecation warning
            //mongoose 6 and above uses defaults true for: useCreateindex. useUnifiedTopology, UseFindAndModify
        })
    };
}

//closing the DataBase if node process is terminated
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Database connection closed due to NodeJs process termination');
        process.exit(0);
    });
});

module.exports = DatabaseDriver;
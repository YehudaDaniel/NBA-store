import express from 'express';


const PORT = 3080 || process.env.PORT;
export const app = express();

//Tells express to parse the json data coming, into an object and be accessable via request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/userWork', userRouter);


const start = async () => {
    try {
        app.listen(PORT,() => console.log(`Server start on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

start();

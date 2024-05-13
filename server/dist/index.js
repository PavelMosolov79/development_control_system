"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', userRouter);
// Error всегда идет последним
app.use(errorMiddleware);
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server start on ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
};
start();

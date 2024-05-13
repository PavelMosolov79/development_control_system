import { PrismaClient } from '@prisma/client';
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

require('dotenv').config();

const userRouter = require('./routes/user.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const prisma = new PrismaClient();
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
        app.listen(PORT,() => console.log(`Server start on ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}

// async function main() {
//     const user = await prisma.person.create({
//        data: {
//             name: "Pavel",
//             surname: "Mos",
//             middlename: "Alek",
//             password: "1000",
//             email: "pavel@gmail.com",
//             phone: "9999999",
//             isactivated: true,
//             activationlink: "link"
//        }
//     });
//     console.log(user)
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

start();

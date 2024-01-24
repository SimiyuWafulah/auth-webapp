import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js';
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Database')
}).catch((error) => {
    console.log(error)
})

app.listen(3000, () => {
    console.log('Server is Running')
});

app.use('/api/user', userRouter);

app.use(errorMiddleware);
import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js';
import cors from 'cors'
import session from 'express-session'
import connectMongo from 'connect-mongo'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Database')
}).catch((error) => {
    console.log(error)
});

//session storing
const MongoStore = connectMongo(session);

//session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 3600000, 
        httpOnly: true,
        secure: true, 
        sameSite: 'None'
    }
}));

app.listen(3000, () => {
    console.log('Server is Running')
});

app.use('/api/user', userRouter);
app.use('/api/auth/', authRouter);

app.use(errorMiddleware);


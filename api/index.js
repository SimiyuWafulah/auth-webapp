import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { errorMiddleware } from './middlewares/error.middleware.js';
import session from 'express-session'
import cors from 'cors'
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
dotenv.config();
import path from 'path'

const app = express();
app.use(express.json());
app.use(cors({
    origin:'https://auth-webapp.onrender.com',
    credentials: true
}))
app.use(cookieParser())

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Database')
}).catch((error) => {
    console.log(error)
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        mongoUrl: process.env.MONGO, 
        collectionName: 'sessions', 
        ttl: 1209600,
    }),
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


import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verify = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if(!token) return next(errorHandler(401, 'You are not authenticated'))
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if(err) return next(errorHandler(403,'invalid Token'))
        req.user = user;
        next()
    })
}
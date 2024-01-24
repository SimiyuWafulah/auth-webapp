import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = await bcryptjs.hash(password,10)
    try {
        //check if user exists
        const existingUser = await User.findOne({$or: [{email}, {username}]})
        if(existingUser) return next(errorHandler(409,'Account with that email or username already exists'))

        //add new user to database
        const newUser = User({username, email, password: hashPassword});
        await newUser.save();
        res
        .status(201)
        .json({message:'Account Created Successfully'})
    } catch (error) {
        next(error)
    } 
}

export const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        //checking if user details exist and authenticating
        const authenticatedUser = await User.findOne({email});
        if(!authenticatedUser) return next(errorHandler(404, 'Account does not exist'));
        const authPassword = bcryptjs.compareSync(password,authenticatedUser.password);
        if(!authPassword) return next(errorHandler(404, 'Wrong Credentials'));

        //generating tokens for user if they are found to exist in the db
        const token = jwt.sign({id: authenticatedUser._id}, process.env.JWT_KEY);
        const {password: pass, ...rest} = authenticatedUser._doc
        res
        .cookie('access_token', token, {httpOnly: true})
        .status(201)
        .json(rest)
    } catch (error) {
       next(error) 
    }
}
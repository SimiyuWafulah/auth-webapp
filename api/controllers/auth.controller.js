import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


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

        //storing user info to sessions
        req.session.user = {
            id: authenticatedUser._id,
            username: authenticatedUser.username
        };

        //generating tokens for user if they are found to exist in the db
        const token = jwt.sign({id: authenticatedUser._id}, process.env.JWT_KEY);
        const expiryDate = new Date(Date.now() + 3600000)
        const {password: pass, ...rest} = authenticatedUser._doc
        res
        .cookie('access_token', token, {httpOnly: true, secure: true, sameSite: 'None', expires: expiryDate})
        .status(201)
        .json(rest)
    } catch (error) {
       next(error) 
    }
}

export const google = async (req, res, next) => {
    try {
        //check if account exists
        const user = await User.findOne({email: req.body.email});
        if (user) {
            //storing user info to sessions
             req.session.user ={
                id : user._id,
                username: user.username
             }
            const token = jwt.sign({id:user._id}, process.env.JWT_KEY);
            const expiryDate =new Date(Date.now() + 3600000);
            const {password: pass, ...rest} = user._id;
            res.cookie('access_token', token, {httpOnly: true, secure: true, sameSite: 'None', expires: expiryDate}).status(200).json(rest)
        } else {
            const createPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword = bcryptjs.hashSync(createPassword, 10);
            const newUser = await User({username: req.body.name, email:req.body.email, password:hashPassword, profilePic: req.body.photoUrl});
            await newUser.save();
            //storing user info to session
            req.session.user = {
                id: newUser._id,
                username: newUser.username
            }
            const token = jwt.sign({id:newUser._id}, process.env.JWT_KEY);
            const {password:pass, ...rest} = newUser._doc
            res.cookie('access_token', token, {httpOnly:true, secure:true, sameSite: 'None', expires: expiryDate}).status(201).json(rest)
        }
    } catch (error) {
        next(error)
    }
}

export const signout =(req, res,) => {
    res.clearCookie('access_token').status(200).json('sign out success')
}
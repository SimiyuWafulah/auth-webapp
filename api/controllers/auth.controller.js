import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashPassword = await bcryptjs.hash(password,10)
    try {
        //check if user exists
        const existingUser = await User.findOne({$or: [{email}, {username}]})
        if(existingUser) return next(errorHandler(401,'Account with that email or username already exists'))

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
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({
        message: "Api route is Working"
    })
}


export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You can only update your account'))
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    username: req.body.username,
                    email:req.user.email,
                    password: req.user.password,
                    proflePic: req.body.proflePic
                }
            },{new : true}
        )
        const {password,...rest} = updatedUser._doc;
        res.status(200).json('Updated User')
         
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res,next) => {
    if(req.user.id !== req.user.params) {
        return next(errorHandler(403, 'Unauthorized'))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('deleted successfully')
    } catch (error) {
        next(error)
    }
}
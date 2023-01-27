import User from "../models/User.js";
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
    try {
        const user = await User.create({...req.body});

        const {password, ...createdUser} = user._doc; // not include password when send back to front-end;
        res.status(StatusCodes.CREATED).json(createdUser);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});
    }
}

export const login = async (req, res) => {
    try {
        if(!req.body.email || !req.body.password) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid Credentials"});
        }
    
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Invalid Credentials"});
        }
    
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Invalid Credentials"});
        }
     
        const token = user.createJwtToken();
    
        const {password, ...respondedUser} = user._doc; // not include password when send back to front-end;
        res.status(StatusCodes.OK).json({respondedUser, token});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message});    
    }
}
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please provide firstName'],
        trim: true,
        min: 3,
        max: 50,
    },
    lastName: {
        type: String,
        required: [true, 'please provide lastName'],
        trim: true,
        min: 3,
        max: 50,
    },
    email: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    birthday: {
        type: Date,
        default: Date.now,
    },
    gender: String,
    profilePicturePath: {
        type: String,
        default: "",
    },
    backgroundPicturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: []
    }
}, {timestamps: true});

// before we stored password to the database, we have to encrypted it. 
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.createJwtToken = function() {
    return jwt.sign(
        {userId: this._id, firstName: this.firstName},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    );
}

const User = mongoose.model('User', UserSchema);
export default User;
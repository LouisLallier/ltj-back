const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,


            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,

        },
        bio: {
            type: String,
            max: 1024,
        }
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
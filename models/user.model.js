const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

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
        firstname: {
            type: String,
        },

        picture: {
            type: String,
            // default: "path"

        },
        bio: {
            type: String,
            max: 1024,
        }
    },
    {
        timestamps: true,
    }
);

// play function before save into display:'block,
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
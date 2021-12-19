const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        gif: {
            type: String,
            default: "../assets/default.jpg"
        },
        url: {
            type: String,
            required: true
        },
        index:{
            type: Number,
            required: true
        },
        description:{
            type:String,
        }
    }
);

const VideoModel = mongoose.model('video', videoSchema);
module.exports = VideoModel;
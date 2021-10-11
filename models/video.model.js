const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        gif: {
            type: String,
            required: true,
            default: "../assets/default.jpg"
        },
        url: {
            type: String,
            required: true
        },
        index:{
            type: Number,
            required: true
        }
    }
);

const VideoModel = mongoose.model('video', videoSchema);
module.exports = VideoModel;
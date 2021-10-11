const VideoModel = require('../models/video.model');

module.exports.addVideo = async (req, res) => {
    const {title, gif, url, index} = req.body

    try {
        const video = await VideoModel.create({title, gif, url, index});
        res.status(201).json({video: video._id})
    } catch (err) {
        console.log(err)
    }
}
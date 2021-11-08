const videoRouter = require('express').Router();
const videoController = require('../controllers/video.controller');
const multer = require('multer');
const fs = require('fs');
const {promisify} = require('util');
const VideoModel = require("../models/video.model");
const pipeline = promisify(require('stream').pipeline);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,`../ltj-front/public/gif`)
    },
    filename: (req, file, cb)=> {
        cb(null, Date.now() + '--' + file.originalname)
    }
});

const upload = multer({storage : storage});

videoRouter.post("/addVideo",upload.single('gif'),  async (req, res) => {
    const {title, url, index} = req.body;
    try {
        console.log(req);
        const video = await VideoModel.create({title, gif: req.file.filename , url, index});

        res.status(201).json({video: video._id})
    } catch (err) {
        console.log(err)
    }
});

videoRouter.get("/allVideos", videoController.getAllVideos);
videoRouter.get('/:id', videoController.videoInfo);
videoRouter.put('/:id', videoController.updateVideo);
videoRouter.delete('/:id', videoController.deleteVideo);

//////upload ../../ltj-front/public/gif/





// videoRouter.post('/upload',async (req, res) => {
//     console.log(req.file);
//     res.send("Single File Uploaded !");
//     try {
//         await VideoModel.findByIdAndUpdate(
//             req.body._id,
//             {$set : {gif: req.file.filename}},
//         {new: true, upsert: true, setDefaultsOnInsert: true},
//         )
//     } catch (err) {
//         console.log(err)
//     }
// }
// )



module.exports = videoRouter;
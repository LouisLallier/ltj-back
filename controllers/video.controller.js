const VideoModel = require('../models/video.model');
const multer = require("multer");
const ObjectID = require('mongoose').Types.ObjectId;


//
// module.exports.updateVideo = async (req, res) => {
//     console.log(req.file);
//     res.send("Single File Uploaded !");
//     try {
//         await VideoModel.findByIdAndUpdate(
//             req.body._id,
//             {$set : {gif: req.file.filename}},
//             {new: true, upsert: true, setDefaultsOnInsert: true},
//             (err, docs) => {
//                 if(!err) return res.send(docs);
//                 else return res.status(500).send({message: err})
//             }
//         )
//     } catch (err) {
//         console.log(err)
//     }
// }




//
// module.exports.addVideo = async (req, res) => {
//     const {title, url, index} = req.body
//
//     try {
//         const video = await VideoModel.create({title, gif: req.file.filename , url, index});
//
//         res.status(201).json({video: video._id})
//     } catch (err) {
//         console.log(err)
//     }
// };

module.exports.getAllVideos = async (req, res) => {
    const users = await VideoModel.find().select('');
    res.status(200).json(users);
}

module.exports.videoInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)
    VideoModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('');
}

module.exports.updateVideo = (req, res)  => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    try {
        VideoModel.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                gif: req.body.gif,
                url: req.body.url,
                index: req.body.index
            },
            {},
            (err, docs) => {
                if (err) return res.status(500).send({message: err});
                return res.send(docs);
            })

    }
    catch (err) {

        return res.status(500).send({message: err});
    }
};

module.exports.deleteVideo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await VideoModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Video Successfully deleted. " });
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};


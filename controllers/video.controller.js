const VideoModel = require('../models/video.model');
const multer = require("multer");
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs')


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

// module.exports.deleteVideo = async (req, res) => {
//     if (!ObjectID.isValid(req.params.id))
//         return res.status(400).send("ID unknown : " + req.params.id);
//
//     try {
//         console.log(req.params)
//         await VideoModel.deleteOne({ _id: req.params.id }).exec();
//         try {fs.unlink(`../ltj-front/public/gif/${req.params.gif}`)} catch (err) {
//             console.log(err)}
//         res.status(200).json({ message: "Video Successfully deleted. " });
//     } catch (err) {
//         return res.status(500).json({ message: err });
//     }
// };

module.exports.deleteVideo = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
try{

    await VideoModel.findById(req.params.id, (err, docs) => {
        if(!err) {
            VideoModel.deleteOne({ _id: req.params.id }).exec();
            console.log(docs.gif)
          fs.unlinkSync(`../../LTJ projet/ltj-front/public/gif/${docs.gif}`, (err)=>{
              if(err) {console.log("failed to delete local image:"+err)} else {
                  console.log('successfully deleted local image')
              }
          })

               console.log('OK');
        }
        else console.log('ID unknown : ' + err);
    });

    } catch (err) {
        return res.status(500).json({ message: err });
    }

};



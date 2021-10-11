const videoRouter = require('express').Router();
const videoController = require('../controllers/video.controller');

videoRouter.post("/addVideo", videoController.addVideo);

module.exports = videoRouter;
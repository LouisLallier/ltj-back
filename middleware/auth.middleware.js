const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    try {
        if (token) {
            console.log('token is here')
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.cookie("jwt", "", { maxAge: 1 });
                    next();
                } else {
                    console.log('decoded token' + decodedToken);
                    let user = await UserModel.findById(decodedToken.id);
                    res.locals.user = user;
                    console.log(res.locals.body);
                    next();
                }
            });
        } else {
            console.log('token not found')
            res.locals.user = null;
            throw new Error('you have no power');
        }
    } catch (e) {
        res.status(401).json(e.message);
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id)
                next();
            }
        });
    } else {
        console.log('No token');
    }
};
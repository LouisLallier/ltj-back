const UserModel = require('../models/user.model')

module.exports.signUp = async (req, res) => {
    console.log(req.body);

    const {username, email, password} = req.body

    try{
        const user = await UserModel.create({username, email, password});
        res.status(201).json({user: user._id});
    }
    catch (err) {
        res.status(200).send({err});
    }
}
const express = require('express');
const UserModel = require('../db/models/UserModel');
const sha512 = require('js-sha512');
const tokenHandler = require('../modules/authtoken');

const router = express.Router();

router.post('/signin', async (req, res) => {
    const data = req.body;

    const encoded = sha512(data.password);

    if(await UserModel.exists({login: data.login, password: encoded})) {
        const user = await UserModel.findOne({login: data.login, password: encoded});
        const login = user.login;
        const id = user.id;

        const token = tokenHandler.generateToken(login, id);

        res.status(200).json({status: 'OK', message: 'Logged in successfully', user: login, token: token});
        return;
    }
    res.status(400).json({status: 'failed', message: 'Credentials are invalid'});

})

router.post('/verifytoken', async (req, res) => {
    const data = req.body;

    if(tokenHandler.verifyToken(data.token, data.user)) {
        const decodedToken = tokenHandler.decodeToken(data.token)
        console.log(decodedToken.id);
        res.status(200).json({status: 'OK', message: `Token valid for user with id ${decodedToken.id}`});
        return;
    }

    res.status(400).json({status: 'failed', message: 'Credentials are invalid'});

})

router.post('/signup', async (req, res) => {

    if(await UserModel.exists({login: req.body.login})) {
        res.status(400).json({status: "failed", message: "Username already in use"});
        return;
    }

    if(req.body.password.length < 8) {
        res.status(400).json({status: "failed", message: "Password must be at least 8 chatacters long"});
        return;
    }

    const encodedPassword = sha512(req.body.password);

    const data = new UserModel({
        login: req.body.login,
        password: encodedPassword,
        name: req.body.name,
        city: req.body.city,
        postalcode: req.body.postalcode,
        gender: req.body.gender,
        age: req.body.age
    })

    try {
        const dataToSave = data.save();
        res.status(200).json({status: "OK", message: "Registered successfully"})
    }
    catch (error) {
        res.status(400).json({status: "fail", message: error.message})
    }
}) 

module.exports = router;
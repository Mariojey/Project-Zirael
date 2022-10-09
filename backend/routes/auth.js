const express = require('express');
const UserModel = require('../db/models/UserModel');


const router = express.Router();

const sha512 = require('js-sha512');



router.post('/signin', async (req, res) => {
    const data = req.body;

    const encoded = sha512(data.password);

    if(await UserModel.exists({login: data.login, password: encoded})) {
        res.status(200).json({status: 'OK', message: 'Logged in successfully'});
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
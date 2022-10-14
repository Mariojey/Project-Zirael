const express = require('express');
const UserModel = require('../db/models/UserModel');
const tokenHandler = require('../modules/authtoken');


const router = express.Router();

router.get('/list/:name', async (req, res) => {
    const name = req.params.name ?? "";
    const users = await UserModel.find({name: {$regex : name, '$options' : 'i'}});

    const results = users.map((user) => {
        return {
            id: user.id,
            name: user.name,
            description: user.description,
            profilecolor: user.profileColor,
        }
    })

    res.json(results);
})

router.get('/profiledata', async (req, res) => {
    const body = req.body;

    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const id = tokenHandler.decodeToken(token).id;

    const userData = await UserModel.findOne({id: id})

    const results = {
        name: userData.name,
        city: userData.city,
        cityid: userData.cityid,
        gender: userData.gender,
        age: userData.age,
        description: userData.description
    }

    res.json(results);
})

router.post('/byid', async (req, res) => {
    const body = req.body;

    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const id = body.id;

    const userData = await UserModel.findById(id)
    console.log(id)

    if(userData === null) {
        res.status(401).json({status: "fail", message: 'User not found'});
        return;
    }

    const results = {
        name: userData.name,
        profileColor: userData.profileColor,
    }

    res.json({status: "OK", ...results});
})
    
router.post('/changedata', async (req, res) => {

    const body = req.body;

    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const id = tokenHandler.decodeToken(token).id;

    var data = {}

    if(body.name !== "") {
        data = {...data, name: body.name}
    }
    if(body.city !== "" && body.cityid !== "") {
        data = {...data, city: body.city, cityid: body.cityid }
    }
    if(!isNaN(body.age) && body.age > 0 && body.age < 150) {
        data = {...data, age: body.age}
    }
    if(body.gender !== "") {
        data = {...data, gender: body.gender}
    }
    if(body.description !== "") {
        data = {...data, description: body.description}
    }

    console.log(Object.keys(data).length);
    if(Object.keys(data).length === 0) {
        res.status(400).json({status: "failed", message: "No data changed"})
        return;
    }

    try {
        await UserModel.findOneAndUpdate({id: id}, data)
        res.status(200).json({status: "OK", message: "Changed Data"})
    }
    catch (error) {
        res.status(400).json({status: "fail", message: error.message})
    }
}) 

module.exports = router;
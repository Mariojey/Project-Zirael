const express = require('express');
const tokenHandler = require('../modules/authtoken');
const PollModel = require('../db/models/PollModel');
const router = express.Router();


router.get('/listall', async (req, res) => {
    const data = await PollModel.find({});

    res.json(data);
})

router.post('/create', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const id = tokenHandler.decodeToken(token).id;

    if(body.options.length < 2) {
        res.status(400).json({ status: "fail", message: "Not enough options" })
        return;
    }

    if(body.title.length < 1) {
        res.status(400).json({ status: "fail", message: "Title not specified" })
        return;
    }

    if(body.cityid.length < 1) {
        res.status(400).json({ status: "fail", message: "City not specified" })
        return;
    }

    const poolOptions = body.options.map((option, index) => {
        return ({
            id: index,
            name: option
        })
    })

    const data = new PollModel({
        author: id,
        title: body.title,
        description: body.description, 
        options: poolOptions,
        tags: body.tags,
        resultsPublic: body.resultsPublic,
        range: body.range,
        city: body.city,
        cityid: body.cityid 
    })

    try {
        const dataToSave = data.save();
        res.status(200).json({ status: "OK", message: "Poll created successfully" })
    } 
    catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
})

module.exports = router
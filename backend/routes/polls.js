const express = require('express');
const mongoose = require('mongoose')
const tokenHandler = require('../modules/authtoken');
const PollModel = require('../db/models/PollModel');
const UserModel = require('../db/models/UserModel');
const VoteModel = require('../db/models/VoteModel');
const RegionModel = require('../db/models/RegionModel');
const router = express.Router();


// router.get('/listall', async (req, res) => {
//     const data = await PollModel.find({}).sort({timestamp: -1});

//     res.json(data);
// })

router.post('/list', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    const userModel = await UserModel.findById(userid);
    
    if(userModel.isAdmin) {
        const data = await PollModel.find({}).sort({timestamp: -1});
        res.status(200).json({status: "OK", message: "Polls fetched", polls: data});
        return;
    }

    const region = await RegionModel.findById(userModel.cityid);
    
    const data = []

    //global
    const globalPolls = await PollModel.find({range: 'global'})
    data.push(...globalPolls);
    
    //provintional
    const provintionalRegions = await RegionModel.find({
        POZIOM: region.POZIOM, 
        REGION: region.REGION,
        WOJ: region.WOJ
    })
    
    if(Array.isArray(provintionalRegions)) {
        const provintionRegions = provintionalRegions.map(reg => mongoose.Types.ObjectId(reg.id));
        const provintionalPolls = await PollModel.find({_id: {$in: provintionRegions}, range: 'provintional'})
        data.push(...provintionalPolls);
    }

    
    
    //regional
    const regionRegions = await RegionModel.find({
        POZIOM: region.POZIOM, 
        REGION: region.REGION,
        WOJ: region.WOJ,
        PODREG: region.PODREG,
        POW: region.POW
    })
    
    if(Array.isArray(regionRegions)) {
        const regionalRegions = regionRegions.map(reg => mongoose.Types.ObjectId(reg.id));
        const regionalPolls = await PollModel.find({_id: {$in: regionalRegions}, range: 'regional'})
        data.push(...regionalPolls);
    }
    

    //local
    const localPolls = await PollModel.find({cityid: userModel.cityid, range: "local"})
    data.push(...localPolls);

    data.sort((a,b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
    })

    res.status(200).json({status: "OK", message: "Polls fetched", polls: data})
})

router.post('/mypolls', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    
    const data = await PollModel.find({author: userid}).sort({timestamp: -1});
    res.status(200).json({status: "OK", message: "Polls fetched", polls: data});
    return;
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

router.post('/delete', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const id = tokenHandler.decodeToken(token).id;
    const pollid = body.pollid;

    const userData = await UserModel.findById(id);
    const pollData = await PollModel.findById(pollid);

    if(!(pollData.author === id || userData.isAdmin)) {
        res.status(400).json({ status: "fail", message: `Insufficient permissions` })
        return;
    }

    try {
        await PollModel.findByIdAndDelete(pollid)
        await VoteModel.deleteMany({pollid: pollid})
        res.status(200).json({ status: "OK", message: "Poll deleted successfully" })
    } 
    catch (error) {
        res.status(400).json({ status: "fail", message: "Internal server error occured" })
    }
})

module.exports = router

const express = require('express');
const tokenHandler = require('../modules/authtoken');
const mongoose = require('mongoose');
const VoteModel = require('../db/models/VoteModel');
const PollModel = require('../db/models/PollModel');
const UserModel = require('../db/models/UserModel');
const router = express.Router();


router.post('/vote', async (req, res) => {
    const body = req.body;

    const user = body.user;
    const token = body.token;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    const pollid = body.pollid;
    const optionid = body.optionid;

    if(isNaN(optionid) || optionid < 0) {
        res.status(401).json({status: "fail", message: 'Incorrect option'});
        return;
    }
    if(await VoteModel.findOne({userid: userid, pollid: pollid}) !== null) {
        await VoteModel.findOneAndUpdate({userid: userid, pollid: pollid},{optionid: optionid})
        res.status(200).json({ status: "OK", message: "Vote registered!" })
        return;
    }

    const data = new VoteModel({
        userid: userid,
        pollid: pollid,
        optionid: optionid
    })

    try {
        const dataToSave = data.save();
        res.status(200).json({ status: "OK", message: "Vote registered!" })
    } 
    catch (error) {
        res.status(400).json({ status: "fail", message: error.message })
    }
})

router.post('/unvote', async (req, res) => {
    const body = req.body;

    const user = body.user;
    const token = body.token;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    const pollid = body.pollid;

    if(await VoteModel.findOne({userid: userid, pollid: pollid}) !== null) {
        await VoteModel.findOneAndRemove({userid: userid, pollid: pollid})
        res.status(200).json({ status: "OK", message: "Vote deleted" })
        return;
    }
        
    res.status(400).json({ status: "fail", message: "Vote not found" })
})

router.post('/getuservote', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    const pollid = body.pollid

    const pollvote = await VoteModel.findOne({userid: userid, pollid: pollid});

    if(pollvote === null) {
        res.status(400).json({status: "fail", message: 'No matching data found'});
        return;
    }

    const optionid = pollvote.optionid;

    res.status(200).json({status: "OK", message:"User vote found", optionid})
})

async function getStats(votes) {
    var results = {
        votes: votes.length,
        chartdata: []
    }

    const userIds = votes.map(vote => mongoose.Types.ObjectId(vote.userid))

    for(let i = 0; i<20; i++) {
        let agefilter = {$gte: i*5, $lte: ((i*5)+4)}

        if(i === 19) {
            agefilter = {$gte: i*5}
        }

        let foundMales = await UserModel.find({
            _id: { $in: userIds}, 
            age: agefilter,
            gender: "male"
        })
        let foundFemales = await UserModel.find({
            _id: { $in: userIds}, 
            age: agefilter,
            gender: "female"
        })
        let foundOthers = await UserModel.find({
            _id: { $in: userIds}, 
            age: agefilter,
            gender: "other"
        })
        let foundHidden = await UserModel.find({
            _id: { $in: userIds}, 
            age: agefilter,
            gender: "hidden"
        })

        const dataCell = {
            age: `${i===19 ? `${i*5}+` : `${i*5}-${(i*5)+4}`}`,
            male: foundMales === null ? 0 : foundMales.length,
            female: foundFemales === null ? 0 : foundFemales.length,
            other: foundOthers === null ? 0 : foundOthers.length,
            hidden: foundHidden === null ? 0 : foundHidden.length
        }

        results.chartdata.push(dataCell);
    }    
    return results;
}

router.post('/fullstats', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    const pollid = body.pollid

    const userModel = await UserModel.findById(userid);
    const poll = await PollModel.findById(pollid);

    if(poll === null) {
        res.status(400).json({status: "fail", message: 'No matching data found'});
        return;
    }

    if(!poll.resultsPublic && poll.author !== userid && !userModel.isAdmin) {
        res.status(400).json({status: "fail", message: 'You dont have permission to view the results!'});
        return;
    }

    const votes = await VoteModel.find({pollid: pollid});

    var response = {
        total: await getStats(votes),
        byOption: []
    }

    const byOption = await Promise.all(poll.options.map(async (option) => {
        const optionvote = await VoteModel.find({pollid: pollid, optionid: option.id});
        const optionData = await getStats(optionvote)
        
        return(optionData);
    }))

    response.byOption = byOption;

    res.status(200).json({
        status: "OK", 
        message: 'Statistic list generated',
        statistics: response
    });
})

router.post('/votecount', async (req, res) => {
    const body = req.body;
    
    const token = body.token;
    const user = body.user;

    if(!tokenHandler.verifyToken(token, user)) {
        res.status(401).json({status: "fail", message: 'Authentication failed'});
        return;
    }

    const userid = tokenHandler.decodeToken(token).id;
    const pollid = body.pollid

    const poll = await PollModel.findById(pollid);

    if(poll === null) {
        res.status(400).json({status: "fail", message: 'No matching data found'});
        return;
    }

    const userModel = await UserModel.findById(userid);

    if(!poll.resultsPublic && poll.author !== userid && !userModel.isAdmin) {
        res.status(400).json({status: "fail", message: 'You dont have permission to view the results!'});
        return;
    }

    const votes = await VoteModel.find({pollid: pollid});

    var response = {
        total: votes.length,
        byOption: []
    }

    const byOption = await Promise.all(poll.options.map(async (option) => {
        const optionvote = await VoteModel.find({pollid: pollid, optionid: option.id});
        const optionData = optionvote.length
        
        return(optionData);
    }))

    response.byOption = byOption;

    res.status(200).json({
        status: "OK", 
        message: 'Vote count generated',
        statistics: response
    });
})

module.exports = router
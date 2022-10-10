//{"NAZWA": {$regex : "Mielec", '$options' : 'i'}}

const express = require('express');
const router = express.Router();
const RegionModel = require('../db/models/RegionModel');
router.get('/find/:name', async (req, res) => {
    const name = req.params.name;

    const regions = await RegionModel.find({name: name});
    
    res.send(regions);
})

module.exports = router

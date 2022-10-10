//{"NAZWA": {$regex : "Mielec", '$options' : 'i'}}

const express = require('express');
const router = express.Router();
const RegionModel = require('../db/models/RegionModel');
router.get('/find/:name', async (req, res) => {
    const name = req.params.name;

    const regions = await RegionModel.find({NAZWA: {$regex : name, '$options' : 'i'}, POZIOM: "5"});
    
    const results = regions.map(region => {
        let id = region.id;
        let name = region.NAZWA
        let subname = region.NAZWA_DOD

        return ({
            id: id,
            name: `${name}, ${subname}`,
        })
    })

    res.json(results);
})

module.exports = router

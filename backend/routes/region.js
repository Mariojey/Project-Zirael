//{"NAZWA": {$regex : "Mielec", '$options' : 'i'}}

const express = require('express');
const router = express.Router();
const db = require('../db/conn');

router.get('/find/:name', async (req, res) => {
    res.send("test");
})

module.exports = router

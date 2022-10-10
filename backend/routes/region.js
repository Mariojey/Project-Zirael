//{"NAZWA": {$regex : "Mielec", '$options' : 'i'}}

const express = require('express');
const router = express.Router();
const db = require('../db/conn');

router.get('/find/:name', (req, res) => {
    res.send(req.params.name);
})

module.exports = router

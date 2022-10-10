const express = require('express');
const cors = require('cors');
const db = require('./db/conn');
const bodyparser = require('body-parser');

const authRoute = require('./routes/auth');
const regionRoute = require('./routes/region');

const port = 3000;
const app = express();


app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use('/auth', authRoute);
app.use('/region', regionRoute);

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})
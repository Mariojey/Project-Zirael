const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})
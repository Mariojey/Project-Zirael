var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');
const cors = require('cors');
const db = require('./db/conn');
const bodyparser = require('body-parser');

const authRoute = require('./routes/auth');
const regionRoute = require('./routes/region');
const userRoute = require('./routes/user');
const pollsRoute = require('./routes/polls');
const votesRoute = require('./routes/votes')

var options = {
    key: fs.readFileSync('./ssl/private.key'),
    cert: fs.readFileSync('./ssl/certificate.crt'),
};

const port = 42069;
const app = express();


app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.use('/auth', authRoute);
app.use('/region', regionRoute);
app.use('/user', userRoute);
app.use('/polls', pollsRoute);
app.use('/votes', votesRoute);

http.createServer(app).listen(42169, '0.0.0.0', ()=> {
    //console.log(`Listening on port ${port}`);
})

https.createServer(options, app).listen(port, '0.0.0.0', ()=> {
    //console.log(`Listening on port ${port}`);
})

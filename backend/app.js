const bodyParser = require('body-parser');
const express = require('express');
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static('images'));
app.use(bodyParser.json());

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

// 404
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    res.status(404).json({message: '404 - Not Found'});
});

console.log("listening to port 3200")
app.listen(3200);

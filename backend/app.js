const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
});
//
// app.get('/login', async (req, res) => {
//     let token;
//     try {
//         //Creating jwt token
//         token = jwt.sign(
//             {username: "sampleusername", password: "samplepass"},
//             "expressjs",
//             {expiresIn: "1h"}
//         );
//     } catch (err) {
//         console.log(err);
//         const error = new Error("Error! Something went wrong with the authentication.");
//         return next(error);
//     }
//
//     res.status(200).json({message: 'authenticated', token: token})
// })


// 404
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    res.status(404).json({message: '404 - Not Found'});
});

console.log("listening to port 3200")
app.listen(3200);

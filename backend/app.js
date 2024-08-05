import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import {v4 as uuidv4} from 'uuid';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

const dataFile = './data/tasks.json';

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

app.get('/tasks', async (req, res) => {
    console.log("get tasks")
    const fileContent = await fs.readFile(dataFile);

    const tasks = JSON.parse(fileContent);

    res.status(200).json({tasks: tasks});
});

app.get('/tasks/:taskId', async (req, res) => {
    const taskId = req.params.projectId;
    console.log("get task by id " + taskId)
    const fileContent = await fs.readFile(dataFile);

    const tasks = JSON.parse(fileContent);

    const task = tasks.find((task) => task.id === taskId)

    res.status(200).json({task: task});
});

app.post('/newtask', async (req, res) => {
    console.log("add task")
    const data = req.body;
    console.log(data)
    if (JSON.stringify(data) === '{}') {
        console.log("invalid input data")
        res.status(500).json({message: 'empty payload'})
    } else {
        console.log(data)
        const fileContent = await fs.readFile(dataFile);
        const tasks = JSON.parse(fileContent);
        data.id = uuidv4();
        tasks.push({...data});
        await fs.writeFile(dataFile, JSON.stringify(tasks));
        res.status(200).json({message: 'project saved.', task: data});
    }
});

app.post('/deletetask', async (req, res) => {
    console.log("deleting a task")
    const data = req.body;
    // console.log(data)
    if (JSON.stringify(data) === '{}') {
        console.log("invalid input data")
        res.status(500).json({message: 'empty payload'})
    } else {
        const fileContent = await fs.readFile(dataFile);
        const tasks = JSON.parse(fileContent);
        const newTasks = tasks.filter((task) => task.id !== data.id);
        await fs.writeFile(dataFile, JSON.stringify(newTasks));
        res.status(200).json({message: 'task deleted.'});
    }
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

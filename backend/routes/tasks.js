const express = require('express');
const {v4: uuidv4} = require("uuid");
const router = express.Router();
const fs = require('node:fs/promises');

const dataFile = './data/tasks.json';

router.get('/all', async (req, res) => {
    console.log("get tasks")
    const fileContent = await fs.readFile(dataFile);

    const tasks = JSON.parse(fileContent);

    res.status(200).json({tasks: tasks});
});

router.get('/id/:taskId', async (req, res) => {
    const taskId = req.params.taskId;
    console.log("get task by id " + taskId)
    const fileContent = await fs.readFile(dataFile);

    const tasks = JSON.parse(fileContent);

    const task = tasks.find((task) => task.id === taskId)

    res.status(200).json({task: task});
});

router.get('/count', async (req, res) => {
    console.log("count tasks")

    const fileContent = await fs.readFile(dataFile);
    const tasks = JSON.parse(fileContent);

    let newTasks = tasks.filter(task => task.status === "NEW").length;
    let inProgressTasks = tasks.filter(task => task.status === "IN PROGRESS").length;
    let doneTasks = tasks.filter(task => task.status === "DONE").length;
    let taskDueToday = tasks.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    let taskDueTomorrow = tasks.filter(task => new Date(task.dueDate).toDateString() === tomorrow.toDateString()).length;

    res.status(200).json({
        all: tasks.length,
        new: newTasks,
        inProgress: inProgressTasks,
        done: doneTasks,
        dueToday: taskDueToday,
        dueTomorrow: taskDueTomorrow,
    });
});

router.post('/addtask', async (req, res) => {
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

router.post('/deletetask', async (req, res) => {
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

module.exports = router;

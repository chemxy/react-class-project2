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

    let newTasks = tasks.filter(task => task.status === "new").length;
    let inProgressTasks = tasks.filter(task => task.status === "in progress").length;
    let doneTasks = tasks.filter(task => task.status === "done").length;
    let taskDueToday = tasks.filter(task => new Date(task.dueDate).toDateString() === new Date().toDateString()).length;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)
    let taskDueTomorrow = tasks.filter(task => new Date(task.dueDate).toDateString() === tomorrow.toDateString()).length;
    const body =
        {
            all: tasks.length,
            new: newTasks,
            inProgress: inProgressTasks,
            done: doneTasks,
            dueToday: taskDueToday,
            dueTomorrow: taskDueTomorrow,
        }

    console.log(body)
    res.status(200).json(body);
});

router.post('/addtask', async (req, res) => {
    console.log("add task")
    const data = req.body;
    /*
        * body =   {
            "title": "task 1",
            "dueDate": "2024-08-10",
            "description": "this is a sample description for task 1",
            "status": "new",
            "priority": "high",
            "createdDate": "2024-03-16",
          }
        * */

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

        console.log("returned data ", data)
        res.status(200).json({message: 'task saved.', task: data});
    }
});

router.post('/updatetask', async (req, res) => {
    console.log("update task")
    const data = req.body;
    /*
    * body = { updateType: "status", newValue: "done" }
    * body = { updateType: "priority", newValue: "high" }
    * body = { updateType: "dueDate", newValue: "2024-02-28" }
    * */

    if (JSON.stringify(data) === '{}') {
        console.log("invalid input data")
        res.status(500).json({message: 'empty payload'})
    } else {
        console.log(data)
        const fileContent = await fs.readFile(dataFile);
        const tasks = JSON.parse(fileContent);
        let newTasks = [];
        let newData = undefined;
        switch (data.updateType) {
            case "status":
                newTasks = tasks.map(task => {
                    if (task.id === data.id) {
                        newData = {...task, status: data.newValue};
                        return newData;
                    } else return task;
                })
                break;
            case "priority":
                newTasks = tasks.map(task => {
                    if (task.id === data.id) {
                        newData = {...task, priority: data.newValue};
                        return newData;
                    } else return task;
                })
                break;
            case "dueDate":
                newTasks = tasks.map(task => {
                    if (task.id === data.id) {
                        newData = {...task, dueDate: data.newValue}
                        return newData;
                    } else return task;
                })
                break;
        }

        await fs.writeFile(dataFile, JSON.stringify(newTasks));

        console.log("returned data ", newData)
        res.status(200).json({message: 'task updated.', task: newData});
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

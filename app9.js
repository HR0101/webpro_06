"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let tasks = []; 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task);
        res.status(201).json({ message: 'タスクが追加されました', task: task });
    } else {
        res.status(400).json({ message: 'タスクが無効です' });
    }
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
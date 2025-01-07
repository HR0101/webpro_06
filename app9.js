"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


let tasks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'task.html'));
});

app.post('/add-task', (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push(task);
        res.status(201).json({ message: 'Task added successfully', tasks });
    } else {
        res.status(400).json({ message: 'Task content is required' });
    }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
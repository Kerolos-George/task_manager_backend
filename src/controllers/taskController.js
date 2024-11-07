const mongoose = require('mongoose');
const TaskService = require('../services/taskService.js');

exports.createTask = async (req, res) => {
   
    console.log("Request body:", req.body); 
    try {
        const task = await TaskService.createTask({ ...req.body, user_id: req.userId });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await TaskService.getTasksByUser(req.userId, req.query.status);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Proceed with finding the task if the ID format is valid
        const task = await TaskService.getTaskById(taskId, req.userId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updateData = req.body;


        if (!mongoose.Types.ObjectId.isValid(taskId)) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const task = await TaskService.updateTask(taskId, req.userId, updateData);
        
        // Debug: Check if the task was found and updated
        console.log("Updated Task:", task);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const task = await TaskService.deleteTask(req.params.id, req.userId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

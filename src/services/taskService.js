const Task = require('../models/task.js');

class TaskService {
    static async createTask(taskData) {
        const task = new Task(taskData);
        return await task.save();
    }

    static async getTasksByUser(userId, status) {
        const filter = { user_id: userId };
        if (status) filter.status = status; 
        return await Task.find(filter);
    }

    static async getTaskById(taskId, userId) {
        return await Task.findOne({ _id: taskId, user_id: userId });
    }

    static async updateTask(taskId, userId, taskData) {
        // Create a filtered object with only allowed fields
        const allowedUpdates = ['title', 'description', 'status'];
        const updates = {};
    
        allowedUpdates.forEach((field) => {
            if (taskData[field] !== undefined) {
                updates[field] = taskData[field];
            }
        });
    
        // Update only the fields that are in the updates object
        return await Task.findOneAndUpdate(
            { _id: taskId, user_id: userId },
            { $set: updates },
            { new: true, runValidators: true }
        );
    }

    static async deleteTask(taskId, userId) {
        return await Task.findOneAndDelete({ _id: taskId, user_id: userId });
    }
}

module.exports = TaskService;

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
      
        return await Task.findOneAndUpdate(
            { _id: taskId, user_id: userId },
            { $set: taskData },
            { new: true, runValidators: true }
        );
    }

    static async deleteTask(taskId, userId) {
        return await Task.findOneAndDelete({ _id: taskId, user_id: userId });
    }
}

module.exports = TaskService;

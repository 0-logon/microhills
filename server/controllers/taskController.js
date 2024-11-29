const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;

    try {
        const task = await Task.create({ title, description, userId });
        res.status(201).json({ message: 'Task created successfully!', task })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.userId;

    try {
        const tasks = await Task.findAll({ where: { userId } });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.destroy({ where: { id, userId: req.userId } });
        if (!task) return res.status(404).json({ message: 'Task not found!' });
        res.json({ message: 'Task deleted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
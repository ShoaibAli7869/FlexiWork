const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            status,
        });
        const task = await newTask.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();
        res.json(task);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.status(500).send('Server Error');
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await Task.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Task removed' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Task not found' });
        }
        res.status(500).send('Server Error');
    }
};

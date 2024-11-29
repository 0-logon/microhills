const express = require('express');
const { createTask, getTasks, deleteTask } = require('../controllers/taskController');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');

router.post('/', authenticate, createTask);
router.get('/', authenticate, getTasks);
router.delete('/:id', authenticate, deleteTask);

module.exports = router;

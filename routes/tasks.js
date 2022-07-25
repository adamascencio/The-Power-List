var express = require('express');
var router = express.Router();
const tasksCtrl = require('../controllers/tasks');

// All routes begin with "/tasks"
/* GET /tasks (index functionality - show all tasks) */
router.get('/', tasksCtrl.index);

// GET /tasks/new (new functionality - show form for new task)
router.get('/new', tasksCtrl.new);

module.exports = router;

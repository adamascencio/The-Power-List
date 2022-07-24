var express = require('express');
var router = express.Router();
const tasksCtrl = require('../controllers/tasks');

// All routes begin with "/tasks"
/* GET /tasks (index functionality - show all tasks) */
router.get('/', tasksCtrl.index);

module.exports = router;

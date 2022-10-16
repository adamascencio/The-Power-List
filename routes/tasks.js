var express = require('express');
var router = express.Router();
const tasksCtrl = require('../controllers/tasks');

// All routes begin with "/tasks"
// GET /tasks (show functionality - show current days tasks) 
router.get('/', tasksCtrl.show);
// GET /tasks/calendar (calendar functionality - show all tasks)
router.get('/calendar', tasksCtrl.index);
// GET /tasks/new (new functionality - show form for new tasks)
router.get('/new', tasksCtrl.new);
// GET /tasks/:id (edit functionality - show form for editing tasks)
router.get('/:id/edit', tasksCtrl.edit);
// GET /tasks/:date (show functionality - show a specific task)
router.get('/:date', tasksCtrl.viewTask);
// PUT /tasks/:id/task/:taskId (update functionality - update done boolean)
router.put('/:id/task/:taskId', tasksCtrl.updateDone);
// PUT /tasks/:id (update functionality - update a task)
router.put('/:id', tasksCtrl.update);
// POST /tasks (create functionality - create new tasks)
router.post('/', tasksCtrl.create);
// DELETE /tasks/:id (delete functionality - delete a note)
router.delete('/:id', tasksCtrl.delete);

module.exports = router;

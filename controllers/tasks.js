const User = require('../models/user');
const Task = require('../models/task');
const Tag = require('../models/tag');

module.exports = {
  index, 
  new: newTask,
  create,
};

function index(req, res) {
  Task.find({}, function(err, tasks) {
    console.log(tasks);
    res.render('tasks/index', {tasks});
  });
}

function newTask(req, res) {
  res.render('tasks/new');
}

function create (req, res) {
  var task = new Task(req.body);
  task.save(function(err) {
    console.log(task);
    res.redirect('/tasks');
  });
}
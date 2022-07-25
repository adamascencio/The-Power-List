const User = require('../models/user');
const Task = require('../models/task');
const Tag = require('../models/tag');

module.exports = {
  index, 
  new: newTask,
};

function index(req, res) {
  Task.find({user: req.user._id}, function(err, tasks) {
    res.render('tasks/index', {tasks});
  });
}

function newTask(req, res) {
  res.render('tasks/new');
}
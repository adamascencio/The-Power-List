const User = require('../models/user');
const Task = require('../models/task');
const Tag = require('../models/tag');

module.exports = {
  index, 
};

function index(req, res) {
  Task.find({user: req.user._id}, function(err, tasks) {
    res.render('tasks/index', {tasks});
  });
}
const User = require('../models/user');
const Task = require('../models/task');


module.exports = {
  index, 
  new: newTask,
  create,
};

function index(req, res) {
  const month = new Date().getMonth()+1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  console.log(new Date(new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)));
  Task.find({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    res.render('tasks/index', {tasks});
  });
}

function newTask(req, res) {
  res.render('tasks/new');
}

function create (req, res) {
  const object = {};
  object.task0 = {
    title: req.body.title[0],
    tag: req.body.tag[0]
  };
  object.task1 = {
    title: req.body.title[1],
    tag: req.body.tag[1]
  };
  object.task2 = {
    title: req.body.title[2],
    tag: req.body.tag[2]
  };
  object.task3 = {
    title: req.body.title[3],
    tag: req.body.tag[3]
  };
  object.task4 = {
    title: req.body.title[4],
    tag: req.body.tag[4]
  };
  object.notes = req.body.notes;
  object.date = req.body.date;
  var task = new Task(object);
  task.user = req.user._id;
  task.save(function(err, task) {
    console.log(task);
    res.redirect('/tasks');
  });
}
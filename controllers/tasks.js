const User = require('../models/user');
const Task = require('../models/task');


module.exports = {
  index, 
  new: newTask,
  create,
  edit
};

function index(req, res) {
  const month = new Date().getMonth()+1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  Task.find({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    res.render('tasks/index', {tasks});
  });
}

function newTask(req, res) {
  const month = new Date().getMonth()+1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const today = new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0);
  console.log(today);
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

function edit(req, res) {
  // const task = Task.findOne({_id: req.params.id, user: req.user._id}, function(err, task) {
  //   res.render('tasks/edit', {task});
  // });
  const month = new Date().getMonth()+1;
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  Task.findOne({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    for (let i = 0; i < 5; i++) {
      if (tasks[`task${i}`]._id == req.params.id) {
        res.render('tasks/edit', {task: tasks[`task${i}`]});
        break;
      }
    }
  });
}
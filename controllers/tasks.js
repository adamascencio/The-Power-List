const User = require('../models/user');
const Task = require('../models/task');


module.exports = {
  show,
  index, 
  new: newTask,
  create,
  edit,
  update,
  delete: deleteNote
};

const month = new Date().getMonth()+1;
const day = new Date().getDate();
const year = new Date().getFullYear();

function show(req, res) {
  Task.find({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    res.render('tasks/index', {tasks});
  });
}

function index(req, res) {
  Task.find({user: req.user._id}, function(err, tasks) {
    res.render('tasks/calendar', {tasks, month, year});
  });
}

function newTask(req, res) {
  const newMonth = ('0' + (new Date().getMonth()+1)).slice(-2);
  const newDay = ('0' + new Date().getDate()).slice(-2);
  const today = `${year}-${newMonth}-${newDay}`;
  res.render('tasks/new', {today});
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
  if (req.body.notes !== '' && req.body.notes !== null) {
   object.notes = req.body.notes;
  }
  object.date = new Date(req.body.date);
  var task = new Task(object);
  task.user = req.user._id;
  task.save(function(err, task) {
    res.redirect('/tasks');
  });
}

function edit(req, res) {
  Task.findOne({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    for (let i = 0; i < 5; i++) {
      if (tasks[`task${i}`]._id == req.params.id) {
        res.render('tasks/edit', {task: tasks[`task${i}`]});
        break;
      }
    }
  });
}

function update(req, res) {
  Task.findOne({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    if (req.body.notes !== '' && req.body.notes !== null) tasks.notes.push(req.body.notes);
    for (let i = 0; i < 5; i++) {
      if (tasks[`task${i}`]._id == req.params.id) {
        tasks[`task${i}`].title = req.body.title;
        tasks[`task${i}`].tag = req.body.tag;
        tasks[`task${i}`].done = req.body.done;
        tasks.save(function(err, task) {
          res.redirect('/tasks');
        });
        break;
      }
    }
  });
}

function deleteNote(req, res) {
  Task.findOne({user: req.user._id, _id: req.params.id}, function(err, task) {
    task.notes.splice(req.params.note, 1);
    task.save(function(err, task) {
      res.redirect('/tasks');
    });
  });
}
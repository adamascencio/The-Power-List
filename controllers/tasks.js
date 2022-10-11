const User = require('../models/user');
const Task = require('../models/task');
const dayjs = require('dayjs')
const weekday = require('dayjs/plugin/weekday');
const weekOfYear = require('dayjs/plugin/weekOfYear');

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

module.exports = {
  show,
  index, 
  new: newTask,
  create,
  edit,
  update,
  updateDone,
  delete: deleteNote
};

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}

const month = dayjs().format("MM");
const day = dayjs().format("DD");
const year = dayjs().format("YYYY");

function show(req, res) {
  Task.find({user: req.user._id, date: new Date(`${year}-${month}-${day}`).setUTCHours(0, 0, 0, 0)}, function(err, tasks) {
    res.render('tasks/index', {tasks});
  });
}

function index(req, res) {
  // Calendar Data
  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
  const currentMonthDayCount = dayjs(`${year}-${month}-01`).daysInMonth();

  function getWeekday(date) {
      return dayjs(date).weekday();
    }

  // Mongoose Search Criteria
  const start = new Date(`${year}-${month}-01`).setUTCHours(0, 0, 0, 0);
  const end = new Date(`${year}-${month}-${daysInMonth}`).setUTCHours(0, 0, 0, 0);

  // find all user's tasks in current month
  Task.find({
    user: req.user._id,
    date: {
      $gte: start,
      $lte: end
    }
  }, function(err, tasks) {
    const successDays =  tasks.filter(task => task.allTasksCompleted === true);
    const successDayIds = successDays.map(task => task.date.getDate() + 1);
    const failDays = tasks.filter(task => task.allTasksCompleted === false);
    const failDayIds = failDays.map(task => task.date.getDate() + 1);
    res.render('tasks/calendar', 
      {
        dayjs,
        weekday,
        weekOfYear,
        currentMonthDayCount,
        getWeekday,
        successDayIds, 
        failDayIds, 
        month, 
        year, 
        getMonthName}
    );
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

function updateDone(req, res) {
  Task.findOne({user: req.user._id, _id: req.params.id}, function(err, task) {
    let allTasksCompletedCheck = false;
    let doneTasks = 0;
    for(let i = 0; i < 5; i++) {
      if (task[`task${i}`]._id == req.params.taskId) {
        task[`task${i}`].done = req.body.done === 'true' ? true : false;
      }
      if (task[`task${i}`].done === true) doneTasks++;
    }
    if (doneTasks === 5) allTasksCompletedCheck = true;
    task.allTasksCompleted = allTasksCompletedCheck;
    task.save(function(err, task) {
          res.redirect('/tasks');
        });
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
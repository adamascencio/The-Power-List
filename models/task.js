const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseTaskSchema = new Schema({
  title: {
    type: String,
    required: true
  }, 
  tag: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
    required: true
  }, 
  done: {
    type: Boolean,
    default: false
  } 
});

const taskSchema = new Schema ({
  task0: baseTaskSchema,
  task1: baseTaskSchema,
  task2: baseTaskSchema,
  task3: baseTaskSchema,
  task4: baseTaskSchema,
  allTasksCompleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: function() {return new Date();}
  },
  notes: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, 
{timestamps: true});

module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
  task1: {
    type: String,
    required: true
  }, 
  task2: {
    type: String,
    required: true
  },
  task3: {  
    type: String,
    required: true
  },
  task4: {
    type: String,
    required: true
  },
  task5: { 
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: function() {return new Date();}
  },
  done: {
    type: Boolean,
    default: false
  },
  notes: String,
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, 
{timestamps: true});

module.exports = mongoose.model('Task', taskSchema);
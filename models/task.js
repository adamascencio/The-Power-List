const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
  task1: {
    type: String,
    required: true,
    done: {
      type: Boolean,
      default: false
    }
  }, 
  task2: {
    type: String,
    required: true,
    done: {
      type: Boolean,
      default: false
    }
  },
  task3: {  
    type: String,
    required: true,
    done: {
      type: Boolean,
      default: false
    }
  },
  task4: {
    type: String,
    required: true,
    done: {
      type: Boolean,
      default: false
    }
  },
  task5: { 
    type: String,
    required: true,
    done: {
      type: Boolean,
      default: false
    }
  },
  date: {
    type: Date,
    default: function() {return new Date();}
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
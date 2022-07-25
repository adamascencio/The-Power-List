const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
  name: [{
    type: String,
    required: true
  }], 
  date: {
    type: Date,
    default: function() {return new Date();}
  },
  done: Boolean,
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
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
  name: {
    type: String,
    required: true,
    timestamps: true
  }, 
  id: Number,
  date: {
    type: Date,
    default: function() {return new Date();}
  },
  done: Boolean
});

module.exports = mongoose.model('Task', taskSchema);
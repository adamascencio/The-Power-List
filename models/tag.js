const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  rank: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true
  },
  notes: String,
  category: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }
});

module.exports = mongoose.model('Tag', tagSchema);
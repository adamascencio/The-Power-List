const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tag1: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  },
  tag2: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  },
  tag3: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  },
  tag4: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  },
  tag5: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  }
});

module.exports = mongoose.model('Tag', tagSchema);
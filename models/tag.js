const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  category: {
    type: String,
    enum: ['Work', 'Personal', 'School', 'Other'],
  }
});

module.exports = mongoose.model('Tag', tagSchema);
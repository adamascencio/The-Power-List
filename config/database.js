const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const tasks = mongoose.connection;

tasks.on('connected', function() {
  console.log(`Connected to ${tasks.name} MongoDB at ${tasks.host}:${tasks.port}`);
});
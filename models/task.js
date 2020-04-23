const mongoose = require('mongoose');


const Task = mongoose.model('Task', {
    title: String,
    description: String,
    done: Boolean,
    price: Number
  });

  
module.exports = Task;
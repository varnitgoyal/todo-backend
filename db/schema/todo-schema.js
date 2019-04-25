var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports={
  todoSchema
}
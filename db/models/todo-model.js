const {todoSchema}=require('../schema/todo-schema');
const mongoose=require('mongoose');
var todosModel=mongoose.model('todos',todoSchema);

module.exports={
    todosModel
}
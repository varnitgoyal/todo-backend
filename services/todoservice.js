const {todosModel}=require('../db/models/todo-model');

const getAllTodos=()=>{
    return todosModel.find({});

}

const saveTodo=(todo)=>{
    let newTodo=todosModel(todo);
    return newTodo.save();

}

const removeTodo=(id)=>{
    return todosModel.deleteOne({_id:id});
}

const updateTodo=(id,data)=>{
    return todosModel.updateOne({_id:id},data);
}

module.exports={
    getAllTodos,
    saveTodo,
    removeTodo,
    updateTodo
}
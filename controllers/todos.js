var express = require("express");
var router = express.Router();
const {
  getAllTodos,
  saveTodo,
  removeTodo,
  updateTodo
} = require("../services/todoservice");

/* GET users listing. */
router.get("/", function(req, res, next) {
  getAllTodos().then(result=>{
    res.send(result);
    
  })
  .catch(err=>{
    console.log(err)
  })
  
});

router.post("/", (req, res, next) => {
  
  saveTodo(req.body).then(result=>{
    res.append('Content-type','application/json')
    res.end(JSON.stringify(result));
  })
  .catch(err=>{
    console.log(err);
  })

});

router.delete('/',(req,res,next)=>{
  console.log("trying to find id"+req.query.id);
  removeTodo(req.query.id)
  .then(result=>{
    console.log(result);
    res.send(JSON.stringify(result));

  })
  .catch(err=>{
    console.log(err);
  })
})

router.patch('/',(req,res,next)=>{
  console.log("printing body",req.body);
  updateTodo(req.query.id,req.body)
  .then(result=>{
    console.log("printing result",result)
    res.send(JSON.stringify(result));
  })
  .catch(err=>{
    console.log(err);
  })

})



module.exports = router;

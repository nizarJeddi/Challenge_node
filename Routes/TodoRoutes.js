const express=require('express');
const { getTodoByid, addTodo } = require('../Controllers/TodoController');
const Route=express.Router();




Route.get("/todo", getTodoByid);
Route.post("/todo", addTodo);


module.exports = Route; 
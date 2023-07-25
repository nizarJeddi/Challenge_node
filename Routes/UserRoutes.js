const express = require("express");
const { getUserByid, addUser, affecte, dessaffecte } = require("../Controllers/UserController");
const Route = express.Router();

Route.get("/user/:id", getUserByid);
Route.post("/user", addUser);
Route.put("/affecte/user/:iduser/:idtodo", affecte);
Route.put("/dessafecte/user/:iduser/:idtodo", dessaffecte);

module.exports = Route;

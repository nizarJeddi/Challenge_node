const Todo = require("../Models/Todo")

exports.addTodo=async(req,res)=>{

  try {
    await Todo.create(req.body)
    res.status(200).send("todo created ")
  } 
  catch (error) {
    res.status(500).send("error serveur")
  }

}

exports.getTodoByid = async (req, res) => {
  try {
    const find = await Todo.findById(req.params.id);
    res.status(200).send(find);
  } catch (error) {
    res.status(500).send("error serveur");
  }
};
exports.setTodo=async(req,res)=>{
  try {
    const todo=await Todo.findByIdAndUpdate(req.params.id , req.body);
    res.status(200).send({message :"todo a été mise à jour avec succés !" , todo})
  } catch (error) {
    
  }
}
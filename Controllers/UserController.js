const User = require("../Models/User");

exports.addUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).send("user created ");
  } catch (error) {
    res.status(500).send("error serveur");
  }
}
exports.getUserByid = async (req, res) => {
  try {
   const find = await User.findById(req.params.id).populate('todos');
    res.status(200).send(find);
  } catch (error) {
    res.status(500).send("error serveur");
  }
};
exports.affecte = async(req,res)=>{

  try {
      const affecter = await User.findByIdAndUpdate(req.params.iduser , { $push:{todos : req.params.idtodo} })
const newaffecte = await User.findById(req.params.iduser).populate('todos')
      res.send(newaffecte);
  } catch (error) {
    res.status(500).send("error serveur");
  }

}
exports.dessaffecte = async (req, res) => {
  try {
    const affecter = await User.findByIdAndUpdate(req.params.iduser, {
      $pull: { todos: req.params.idtodo },
    });
      const newAffect=await User.findById(req.params.iduser)
    res.send( newAffect);
  } catch (error) {
    res.status(500).send("error serveur");
  }
};




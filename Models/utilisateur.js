const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
   password:{
    type:String
   },
   token:{
    type:String,
    default:''
   }
  },
  { timestamps: true, versionKey: false }
);
const utilisateur = mongoose.model("Utilisateur", userSchema);

module.exports = utilisateur;

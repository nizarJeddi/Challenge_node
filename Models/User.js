const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema=new schema({
  name:{
    type:String,
    
  },
  email:{
    type:String,
  },
  todos:[{type:mongoose.Schema.Types.ObjectId,ref:'todo'}]
}
, {timestamps : true , versionKey : false });
const User=mongoose.model('User',userSchema);
module.exports=User
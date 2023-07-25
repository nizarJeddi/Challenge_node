const express=require("express");
const { upload } = require("../Controllers/uploadController");
const route=express.Router();


//api upload :

route.post('/upload',upload.array('image',2),(req,res)=>{
  try {
     res.status(200).send("image has successfully uploaded"+"\n"+req.files);
  } catch (error) {
    res.status(400).send("only images !!")
    console.log(error);
  }
 
})




module.exports=route
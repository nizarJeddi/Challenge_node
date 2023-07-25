const express=require("express");
const route=express.Router();

const User = require("../Models/User");
const Utilisateur=require("../Models/utilisateur")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const secretCode = process.env.SECRET_KEY;

const bcrypt = require("bcrypt");
const emailExistence = require("email-existence");
const emailValidity=async(req,res,next)=>{
  try {
     emailExistence.check(req.body.email, async (err, response) => {
       if (err) {
         console.error(err);
         return res
           .status(500)
           .send(
             "Une erreur de serveur s'est produite lors de la vérification de l'adresse e-mail."
           );
       }

       if (response) {
        next()
       } else {
         // L'adresse e-mail n'existe pas
         res.status(400).send("L'adresse e-mail incorrècte !!!");
       }
     });
  } catch (error) {
    res.status(400).send(error)
  }

}

const emailFound=async(req,res,next)=>{
  const found=await Utilisateur.findOne({email:req.body.email});
  if (found) {
    res.status(400).send(' ops email existe !!')
  }
  else {
    next()
  }
}

route.post("/register",emailValidity,emailFound,async(req,res)=>{
  try {
     const { name, email, password } = req.body;
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);
     const postUserDb = await Utilisateur.create({name:name,email:email,password:hashedPassword,token:''});
     res
       .status(200)
       .send({ message: "utilisateur ajouté au db ", info: postUserDb });
  } catch (error) {
    res.status(400).send(error)
  }
 
})
route.post('/logIn',async(req,res)=>{
  req.user='abcde'
  const user=await Utilisateur.findOne({email:req.body.email});

  if (!user) {
    return res.status(400).send('adresse email invalid !')
  }
  const verif=await bcrypt.compare(req.body.password,user.password);
  if (verif) {
    
     jwt.sign({ email:user.email }, secretCode,{expiresIn:'10m'}, async(err, result) => {
       if (err) {
         res.status(400).send("erreur serveur pendant la création de token! ");
       } else {
        const updateUser=user.set({...user,token:result});
        await updateUser.save();
        res.status(200).send({message:`login validé ${user.name} ! bienvenue au  ${req.user}`,token:result});
       }
     });
  
    
  } else {
    res.status(400).send('mot de passe incorrécte !!')
  }
})



const authentification = async (req, res,next) => {
  const bearer = req.headers["authorization"];
  const tab = bearer.split(" ");
  const token = tab[1];

  jwt.verify(token, secretCode, async (err, data) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).send("session expirée, veuillez vous reconnecter.");
      } else {
        res.status(400).send("ops ! passez au login pour se connecter");
      }
    } else {
      const user = await Utilisateur.findOne({ email: data.email });
      if (user) {
       req.utilisateur=user;
       next()

      }
      if (!user) {
        res.status(400).send('user non trouvé dans db')
      }
    }
  });
};

route.post("/createPosts",authentification, async (req, res) => {
       res.status(200).send({message:`${req.utilisateur.name} vous pouvez créertes propres postes dans le site`,user:req.utilisateur})
      }
  
);




// const sendEmail = require("../email_send/mailer");
// route.post('/send',async(req,res)=>{
//   try {
//     const t=[{nom:'nizar',email:'nizar.jedi@gmail.com'},{nom:'oussama',email:'nizar.jedi@gmail.com'}];
//     t.map(async(el)=>{
//        const mailOptions = {
//          from: process.env.EMAIL_ADDRESS,
//          to: el.email,
//          subject: "send mail",
//          html: `<h2>Bonjour ${el.nom} ! </h2>
    
//             <h4> Voilà le test de votre api  </h4>
    
//     `,
//        };
//          return await sendEmail(mailOptions);

//     })
//     res.status(200).send('envoi des emails avec success')

//   } catch (error) {
//     console.log(error);
//     res.status(400).send('bad request')
//   }
// })


module.exports=route
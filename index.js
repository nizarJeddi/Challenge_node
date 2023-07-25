const express= require("express")
 const morgan = require("morgan")
 const cors = require("cors")
 const bodyParser = require("body-parser")


//  var cron = require("node-cron");

//  var task=cron.schedule("*/3 * * * * *", () => {
//    console.log("running a task every 3 seconde");
//  });
//  task.start();
//  setTimeout(() => {
//   task.stop();
//   console.log('arrèt de task !');
//  }, 60000);


 



const app=express();


/** data base connection */
require("./Database/Connect")


/** express config */
const dotenv = require("dotenv");
dotenv.config();
 app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
 
app.use(bodyParser.json());


/**initialise route */
const todoRoute = require("./Routes/TodoRoutes")

app.use('/api' , todoRoute)

const userRoute = require("./Routes/UserRoutes");

app.use("/api", userRoute);
const emailRoute=require("./Routes/emailRoutes")
app.use("/api",emailRoute)
const uploadRoute=require("./Routes/uploadRoute");
app.use("/api",uploadRoute)
const jwtRoute=require("./Routes/jwtRoute");
app.use("/api",jwtRoute)


/** application listening port  */
app.listen(process.env.port||4000,function () {
  console.log("l'application Node.js a été montée avec succés dans le serveur localhost ayant le port 4000");
})
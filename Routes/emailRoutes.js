const express=require("express");
const { emailSend } = require("../Controllers/sendEmailController");
const route =express.Router();
route.post("/send-email", emailSend);
module.exports = route;
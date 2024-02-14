const exp=require('express');
const userController=require("../controllers/userController.js");
const { authMiddleware } = require('../middleware.js');
const Router=exp.Router();

Router.post("/signup",userController.registerUser)
Router.post("/signin",userController.signIn)
Router.post("/", authMiddleware,userController.updateInfo)
Router.get("/bulk", userController.bulkInfo);

module.exports=Router;
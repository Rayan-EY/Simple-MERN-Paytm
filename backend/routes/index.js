const express=require('express');
const userRouter=require("./user");
const accountRouter=require("./account");
const { authMiddleware } = require('../middleware');
const  userController =require("../controllers/userController")
const Router=express.Router();

Router.use("/user",userRouter);
Router.use("/account",accountRouter);
Router.get("/users",authMiddleware,userController.users);




module.exports=Router;
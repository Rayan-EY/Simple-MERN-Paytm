const express=require('express');
const userRouter=require("./user");
const Router=express.Router();

Router.use("/user",userRouter);






module.exports=Router;
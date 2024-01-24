const express=require('express');
const userRouter=require("./user");
const accountRouter=require("./account");
const Router=express.Router();

Router.use("/user",userRouter);
Router.use("/account",accountRouter);





module.exports=Router;
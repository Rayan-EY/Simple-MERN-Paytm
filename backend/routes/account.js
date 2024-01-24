const express=require('express');
const userRouter=require("./user");
const { authMiddleware } = require('../middleware');
const  accountController  = require('../controllers/accountController');
const Router=express.Router();

Router.get("/balance",authMiddleware,accountController.getBalance)

module.exports=Router;
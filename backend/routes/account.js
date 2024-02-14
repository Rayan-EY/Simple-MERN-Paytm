const express=require('express');
const { authMiddleware } = require('../middleware');
const  accountController  = require('../controllers/accountController');
const Router=express.Router();

Router.get("/balance",accountController.getBalance)
Router.post("/transfer",authMiddleware,accountController.transfer)
module.exports=Router;
const { Account } = require("../db")

const getBalance=async(req,res)=>{
    try{ const account=await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
} catch(err){
    res.status(401).json("Internal server error")
}
}
module.exports={
    getBalance
}
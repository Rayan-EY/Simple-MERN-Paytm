const db = require("../db");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const getBalance=async(req,res)=>{
    console.log("hit balance");
    try{ 
        const token=req.query.token;
        console.log(token);
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        if(decoded){
            
        const account=await db.Account.findOne({
        userId: decoded.userId

    });
    res.json({
        balance: parseFloat((account.balance).toFixed(2))
    });}
    else{
        res.status(401).json("No such user found");
    }
} catch(err){
    res.status(401).json("Internal server error")
}
}


const transfer=async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await db.Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await db.Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await db.Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await db.Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    });
};

module.exports={
    getBalance,
    transfer
}
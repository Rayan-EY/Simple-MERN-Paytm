
const jwt=require('jsonwebtoken')

const zod=require('zod')
const db=require("../db")
const nameSchema=zod.string();
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const registerUser=async (req,res)=>{
    console.log("hit signup");
    const {username,firstName,lastName,password}=req.body;
    if((username,firstName,lastName,password)=='' || !(nameSchema.parse(username,firstName,lastName,password))){
        return res.status(404).json({
            msg:"Invalid details"
        })
    }
    try{
    const existingUser=await db.User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(409).json({
            msg:"already exists"
        })
    }

    const user=await db.User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    
   
    const userId=user._id;
    await db.Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    console.log(process.env.JWT_SECRET);
    const token=jwt.sign({
        userId
    },process.env.JWT_SECRET);

    res.status(200).json({
        msg:"User added",
        token:token
    })
} catch(err){
    res.status(500).json({msg:"Internal server error"})
}




    
}

const signIn=async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    try{
    const user = await db.User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
  
        res.status(200).json({
            token: token
        })
        return;
    }

    
    res.status(404).json({
        message: "Error:404: User not found!"
    })
    } catch(err){
        res.status(401).json({ msg:"Internal server error"})
    }
}

const updateInfo=async (req,res)=>{
    const updateBody = zod.object({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
    })
    try{
    const {success}=updateBody.safeParse(req.body)

    if(!success){
        res.json({
            msg:"Error in updating"
        })
    }

    await db.updateOne(req.body,{
        id:req.userId
    })

    res.json({
        msg:"updated"
    })
} catch(err){
    res.status(401).json({ masg:"Internal server error"})
}


}

const bulkInfo=async (req,res)=>{
    try {
        console.log("hit bulk");
        const filter = req.query.filter || "";

    const users = await db.User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}   catch(err){
    res.status(401).json({ masg:"Internal server error"})
}
}

const users = async (req, res) => {
    try {
      const users = await db.User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports={
    bulkInfo,
    registerUser,
    updateInfo,
    signIn,
    users
}
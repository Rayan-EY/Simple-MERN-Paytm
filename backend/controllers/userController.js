import { JWT_SECRET } from '../config';
const jwt=require('jsonwebtoken')

const zod=require('zod')
const db=require("../db")
const nameSchema=zod.string()
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

export const registerUser=async (req,res)=>{
    const [username,firstName,lastName,password]=req.body;
    if(!(nameSchema.parse(username,password,lastName,password))){
        return res.json({
            msg:"Invalid details"
        })
    }

    const existingUser=await db.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.json({
            msg:"already exists"
        })
    }

    const user=await db.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    

    const userId=db._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token=jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        msg:"User added"
    })




    
}

export const signIn=async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await db.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
}

export const updateInfo=async (req,res)=>{
    const updateBody = zod.object({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
    })
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


}

export const bulkInfo=async (req,res)=>{
    const filter = req.query.filter || "";

    const users = await User.find({
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
}
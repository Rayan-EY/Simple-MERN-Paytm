const express = require("express");
const { connection, connectToDB } = require("./db");
const cors=require('cors')
require('dotenv').config();

const bodyParser=require('body-parser')
const mainRouter=require('./routes/index')
const accountRouter=require("./routes/account")

const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use("/api/v1",mainRouter)
app.use("/api/v1/account",accountRouter)




app.listen(3000)

connectToDB();

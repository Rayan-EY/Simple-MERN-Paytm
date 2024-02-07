// backend/db.js
const mongoose = require('mongoose');

async function connectToDB(){

try{
    await mongoose.connect("mongodb+srv://rayanahmed1805:2agcfVWomzV2kJhP@cluster0.lrtutgf.mongodb.net/")
    console.log("connected to db");
} catch(err){
    console.log("Error connecting to DB");
}
}
// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account,
    connectToDB
};
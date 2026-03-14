const mongoose = require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB")
    }catch(err){
        console.log("Error connecting to MongoDB:",err)
    }
}

module.exports = connectDB;
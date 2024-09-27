const mongoose = require("mongoose");

// mongoose.connect()
const URI = process.env.MONGODB_URI;

const connectDb = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("Connection successful to mongoDB :)");
    }catch(error){
        console.log("database connection failed")
        process.exit(0);
    }
}

module.exports = connectDb;
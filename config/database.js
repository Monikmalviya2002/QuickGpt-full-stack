import mongoose from "mongoose";
import "dotenv/config";

const connectDB  = async()=>{
   const dbURL = process.env.MONGO_URI;


      if(!dbURL){
        console.log("DB_CONNECTION_STRING not define")
        return;
      }

      try{
         await mongoose.connect(dbURL);
          console.log(" ✅ MongoDB connected");

      }catch(err){
        console.error(" ❌ MongoDB connection error:", err.message);
        throw err;
        
      }

};

   export default connectDB;
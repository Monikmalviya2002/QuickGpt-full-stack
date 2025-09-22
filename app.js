import express from "express"; 
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";



const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,

};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api", chatRoutes)
app.use("/api" , authRoutes)


connectDB()
.then(()=>{
    console.log("✅ DATABASE connection is succesfull");


app.listen(7777,()=>{
    console.log("✅ server is active on 7777");
})
})

.catch(()=>{
    console.log("❌DATABASE connection is failed");
})
import express from "express";
import User from "../models/user.js";
import validateSignUp from "../utills/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 const authRouter = express.Router();

   authRouter.post("/signup",async(req,res)=>{
            try{
                  validateSignUp(req);
                  const{emailId, password} = req.body;
                  const passwordHash = await bcrypt.hash(password, 10);
                   
                    const existingUser = await User.findOne({emailId})
                   
                        if (existingUser) {
                return res.status(400).json({ error: "Email already registered" });
                        }
                      
                     const user = new User ({
                          emailId,
                          password: passwordHash
                     });
    
                        const saveUser = await user.save();
                      
                        res.json({ message: "User Added Successfully", data: saveUser });
                    }
                catch(err){
                res.status(400).send("ERROR: " + err.message);
                }     

                } );

         authRouter.post("/login" , async(req,res)=>{
                try{
                 const {emailId, password} = req.body;
                 const user = await User.findOne({emailId : emailId})
                if(!user){
                throw new Error("invalide emailId and password");
                }
                 const isPasswordValid =  await bcrypt.compare(password, user.password)

               if(isPasswordValid){
          
             const token = await jwt.sign({_id: user._id}, "Monik@2002")
       

             res.cookie("token", token);
                  res.status(200).send({ message: "User Login successfully",user });
               }
               else{
          throw new Error("invalide emailId and password")
             }
           } catch(err){
           res.status(400).send("ERROR: " + err.message);
           } 
         });

              authRouter.post("/logout" , async(req,res)=>{
                    res.cookie("token", null,{
                   expires: new Date(Date.now()),
                   });   
              res.send("log out successfully");
                    })


  export default authRouter;
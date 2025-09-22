import express from "express";
import Thread from "../models/thread.js";
import openAIResponse from "../utills/openai.js";


const router = express.Router();


//to get all the thread
 router.get("/thread" ,async(req,res)=>{
     try{
        const threads = await Thread.find({}).sort({createdAt:-1});
        res.json(threads);
     }catch(err){
       console.error(err);
    res.status(500).json({ error: "failed to fetch thread" });
     }
     
 });

  // to get particular thread 
    router.get("/thread/:threadId" , async(req,res)=>{
           const { threadId } = req.params;
          try{
             const thread =   await Thread.findOne({threadId});
              if(!thread){
                res.status(404).json({error: "Thread not found"})
              }

              res.json(thread);

          }catch(err){
            console.log(err)
            res.status(500).json({ error: "failed to fetch chat" });
          }
    });

    //to delete particular thread;
     router.delete("/thread/:threadId" , async(req,res)=>{
          const {threadId} = req.params;
          try{
             const deletedThread = await Thread.findOneAndDelete({ threadId });
              if(!deletedThread){
                res.status(404).json({error: "Thread not found"})
              }

              res.status(200).json({success: "Thread deleted succssfully"});

          }catch(err){
            console.log(err)
            res.status(500).json({ error: "failed to delete thread" });
          }
    });


       router.post("/chat" , async(req,res)=>{
            const{threadId,message} = req.body;
            if(!threadId || !message){
                res.status(400).json({err: "missing required fields"})
            }

            try{
             let thread =  await Thread.findOne({threadId});
             if(!thread){
                 thread = new Thread({
                    threadId,
                    title : message,
                    messages: [{ role: "user", content: message }],
                 })
             } else{
                thread.messages.push({role: "user"  , content: message});
             };
                const assistantReply = await openAIResponse(message);
                thread.messages.push({role: "assistant"  , content: assistantReply});

                await thread.save();
              res.json({ reply: assistantReply.trim() });

            }catch(err){
              console.log(err);
              res.status(500).json({error: "something went wrong"});
            }
       });


     export default router;

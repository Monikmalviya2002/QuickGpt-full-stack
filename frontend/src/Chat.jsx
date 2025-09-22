import React, { useEffect, useState,useRef } from 'react'
import { useContext } from 'react';
import { Mycontext } from './Mycontext';
import "./Chat.css";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";


const Chat = () => {
       const {newchat , prevChats, reply}  = useContext(Mycontext);
       const [latestReply , setLatestReply] = useState(null);
          const chatEndRef = useRef(null);

           useEffect(()=>{
              if(reply==null){
                setLatestReply(null);
                return;
              }
            if(!prevChats?.length) return;
             
            const content =  reply.split(" ");
            let idx =0;
            const interval = setInterval(() => {
              setLatestReply(content.slice(0,idx+1).join(" "));

               idx++;
              if(idx>=content.length) clearInterval(interval); 
             }, 50);
             
             return() => clearInterval(interval);
           },[prevChats,reply])

               useEffect(() => {
              chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
             }, [prevChats, latestReply]);

                return (
                  <>
               {newchat && !reply && !latestReply && <h1>Start a New Chat!</h1>}
                 
                <div className='chats'>
                    {
                  prevChats?.slice(0,-1).map((chat,idx)=>
                    <div className={chat.role=== "user" ? "userDiv ": "gptdiv"} key={idx}>
                    {
                      chat.role ==="user"? 
                      <p className='userMessage'>{chat.content}</p> :
                    <ReactMarkdown  rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                       
                       {chat.content}
                     </ReactMarkdown>

                    }
                    </div>
                
                  )
                }
               {
                prevChats.length >0 && latestReply !== null &&
                <div className="gptdiv" key={"typing"}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                 {latestReply}
               </ReactMarkdown>

                  
                </div>
               }

                 {
                prevChats.length >0 && latestReply== null &&
                <div className="gptdiv" key={"non-typing"}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
                 {prevChats[prevChats.length-1].content}
               </ReactMarkdown>

                   
                </div>
               }
                <div ref={chatEndRef} />
        </div>
    </>
  )
}

export default Chat;

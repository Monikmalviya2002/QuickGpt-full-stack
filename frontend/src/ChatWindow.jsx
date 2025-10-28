import React, { useContext, useEffect, useState } from 'react';
import './ChatWindow.css';
import { Mycontext } from './Mycontext';
import axios from 'axios';
import {ScaleLoader} from "react-spinners";
import Chat from './Chat.jsx';s
import { useNavigate } from 'react-router-dom';
import Login from './Login.jsx';


const ChatWindow = () => {
         const { reply, setReply, prompt, setPrompt , currThreadId,prevChats,setPrevChats } = useContext(Mycontext);
          const [loading , setLoading]  = useState(false);
          const[isopen ,setIsopen] = useState(false);
            const navigate = useNavigate();



           const getReply = async () => {
                     setLoading(true);
              

            try {
            const res = await axios.post(
                "https://quickgpt-full-stack.onrender.com/api/chat",
                { message: prompt, threadId: currThreadId}, 
             { headers: { "Content-Type": "application/json" }, withCredentials: true }
                     );
                          
                      console.log(res.data);

                       setReply(res.data.reply);
                       
                    }
                     catch (err) {   
               console.log(err);
                   }

                    setLoading(false);
                  }
                    useEffect(()=>{
                      if(prompt && reply){
                        setPrevChats(prevChats=>(
                          [...prevChats,{
                            role:"user",
                            content: prompt
                          },{
                            role: "assistant",
                            content:reply
                          }
                        ]
                        ))
                      }
                      setPrompt("")
                    },[reply]);
          
                    
                const handleDropdown = ()=>{
                    setIsopen(!isopen);
            
                }

                       
                     const handleLogout = async () => {
                              try {
                      
              
                       const res = await axios.post(
                  "https://quickgpt-full-stack.onrender.com/api/logout",
                         {},
                          { withCredentials: true }
                        );
                        console.log("Logout success:", res.data);
                            
                          navigate("/Login");
                      
                         }catch (err) {
                         console.error("Auth error:", err.response?.data || err.message);
                  
                         }
                     }
                      
                      
                    
                     
return (
  <div className="chatwindow">
    <div className="navbar">
      <span>
        QuickGpt <i className="fa-solid fa-chevron-down"></i>
      </span>

      <div className="user">
        <div className="usericon" onClick={handleDropdown}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
    </div>

   
    {isopen && (
      <div className="dropDown">
        <div className="dropdownItems">
          <i className="fa-solid fa-gear"></i> Settings
        </div>
        <div className="dropdownItems">
          <i className="fa-solid fa-arrow-up-from-bracket"></i> Upgrade Plan
        </div>
        <div
          className="dropdownItems"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
        </div>
      </div>
    )}

    
    <Chat />

    <ScaleLoader color="#fff" loading={loading} />

    <div className="chatinput">
      <div className="inputbox">
        <input
          placeholder="Ask anything"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
        />
        <span id="submit" onClick={getReply}>
          <i className="fa-solid fa-paper-plane"></i>
        </span>
      </div>

      <p className="info">
        QuickGpt can make mistakes. Check important info. See Cookie
        Preferences.
      </p>
    </div>
  </div>
);
}


export default ChatWindow;

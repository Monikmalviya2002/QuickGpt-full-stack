import './App.css';
import ChatWindow from "./ChatWindow.jsx";
import "./sidebar.css";
import Sidebar from "./Sidebar.jsx";
import { useState } from 'react';
import { Mycontext } from './Mycontext.jsx';
import { v1 as uuidv1 } from 'uuid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';   

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [currThreadId, setcurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newchat, setNewChat] = useState(true);
  const [allThread, setAllThread] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setcurrThreadId,
    prevChats, setPrevChats,
    newchat, setNewChat,
    allThread, setAllThread
  };

  return (
   
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Mycontext.Provider value={providerValues}>
                <div className="app">
                  <Sidebar />
                  <ChatWindow />
                </div>
              </Mycontext.Provider>
            }
          />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

import React, { useEffect, useContext } from 'react';
import "./sidebar.css";
import { Mycontext } from './Mycontext';
import './App.css';
import { v1 as uuidv1 } from 'uuid';
import axios from 'axios';

const Sidebar = () => {
  const { allThread, setAllThread, currThreadId, setPrompt, setReply, setNewChat, setcurrThreadId, setPrevChats } = useContext(Mycontext);


const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:7777";


  const getAllThreads = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/thread`,
        { withCredentials: true }
      );

      const filterdata = response.data.map(thread => ({
        threadId: thread.threadId,
        title: thread.title
      }));

      setAllThread(filterdata);
    } catch (err) {
      console.error("Error fetching threads:", err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const getNewChat = () => {
    setNewChat(true);
    setPrevChats([]);
    setPrompt("");
    setReply(null);
    setcurrThreadId(uuidv1());
  };

  const changeThread = async (newThreadId) => {
    setcurrThreadId(newThreadId);
    try {
      const response = await axios.get(
        `${API_BASE}/api/thread/${newThreadId}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setPrevChats(response.data.messages);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await axios.delete(
        `${API_BASE}/api/thread/${threadId}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setAllThread(prev => prev.filter(thread => thread.threadId !== threadId));
      if (threadId === currThreadId) {
        getNewChat();
      }
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <section className='sidebar'>
      <button onClick={getNewChat}>
        <img src="src/assets/channels4_profile.jpg" alt='logo' className='logo'></img>
        <i className="fa-solid fa-pen-to-square"></i>
      </button>

      <ul className="history">
        {
          allThread?.map((thread, idx) => (
            <li key={idx}
              onClick={(e) => changeThread(thread.threadId)}
              className={thread.threadId === currThreadId ? "highlighted" : " "}
            >
              {thread.title}

              <i className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </li>
          ))
        }
      </ul>

      <div className='sign'>
        <p>Build by @monik malviya</p>
      </div>
    </section>
  )
}

export default Sidebar;

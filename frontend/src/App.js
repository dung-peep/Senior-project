import logo from './logo.svg';
import './App.css';
import {
  openAIResponse
} from './apiRequests.js'
import { useState, useEffect } from 'react';
import * as React from 'react';
import { ChatList } from './components/ChatList.js'
// import Chat from './components/Chat.js';
// import { Chat } from './components/ChatBox.js';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{
          border: '10px solid rgb(14, 154, 75)',
        }}>
          Please tell me how you are feeling?
        </p>
        <ChatList/>
        <a
          className="App-link"
          // href="https://reactjs.org"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Mental Wellness Bot
        </a>
      </header>
    </div>
  );
}

export default App;

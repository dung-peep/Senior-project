import logo from './logo.svg';
import './App.css';
import {
  openAIResponse
} from './apiRequests.js'
import { useState, useEffect } from 'react';
import * as React from 'react';
import { FullWidthTextField } from './components/FullWidthTextField.js'



function App() {
  const [chatGPTResponse, setChatGPTRepsonse] = useState({})
  useEffect(() => {
    
  }, [])
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please tell me how you are feeling?
        </p>
        <FullWidthTextField/>
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

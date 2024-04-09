import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import './FullWidthTextField.css';
import { openAIResponse } from '../apiRequests';
import { openAIChatHistory } from '../openAI/chatHistoryHolder';
import { useState } from 'react';

export const FullWidthTextField = () => {
  const [textInput, setTextInput] = useState("")
  const [chatGPTResponse, setChatGPTRepsonse] = useState([])

  return (
    <Box>
      <Box>
      {
        chatGPTResponse.map((response) => {
          return (
            <TextField 
              fullWidth
              className='Text-field' 
              label="" 
              id="fullWidth" 
              value={response}
            />
          )
        })
      }
      </Box>
      <Box
        className='Text-field-box'
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField 
          fullWidth
          className='Text-field' 
          label="" 
          id="fullWidth" 
          value={textInput}
          onChange={(event) => {
           setTextInput(event.target.value)
        
          }}
          onKeyDown={async (event) => {
            if(event.key === 'Enter'){
              const response = await openAIResponse(textInput);
              setChatGPTRepsonse((prev) => {
                return [...prev, textInput, response.content]
              })
              openAIChatHistory.addChat(textInput, "user")
              openAIChatHistory.addChat(response.content, response.role)
              setTextInput("")
            }
          }}
        />
      </Box>
    </Box>

      
  );
}

export default FullWidthTextField;

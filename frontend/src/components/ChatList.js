import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import './ChatList.css';
import { openAIMentalHealthChatBot, openAIInsultingChatBot } from '../apiRequests';
import { openAIChatHistory } from '../openAI/chatHistoryHolder';
import { useState, useEffect } from 'react';
import { Avatar, Stack, SnackbarContent, Button, ButtonGroup } from "@mui/material";


export const ChatList = () => {
  const [textInput, setTextInput] = useState("")
  const [localChatHistory, setLocalChatHistory] = useState(openAIChatHistory.getChatHistoryMessages())

  const deleteChatMessage = (index) => {
    openAIChatHistory.deleteChat(index)
    setLocalChatHistory(openAIChatHistory.getChatHistoryMessages())
  }

  const sendChatMessage = async (message) => {
    openAIChatHistory.addChat(message, "user")

    const chatHistory = openAIChatHistory.getChatHistory()
    const response = await openAIInsultingChatBot(chatHistory);
    openAIChatHistory.addChat(response.content, response.role)
    
    setLocalChatHistory(openAIChatHistory.getChatHistoryMessages())
  }

  return (
    <Box>
      <Box>
        <Stack 
        spacing={2} 
        sx={{ 
          width: 500, 
          maxHeight: 400, 
          overflow: 'auto',
          maxWidth: '100%',
          border: '10px solid rgb(14, 154, 75)',
        }}
        >
        {
          localChatHistory.map((response, index) => {
            return (
              <SnackbarContent message={response} action={() => deleteChatMessage(index)} />
            )
          })
        }
        </Stack>
      </Box>
      <Box
        className='Text-field-box'
        sx={{
          width: 500,
          maxWidth: '100%',
          border: '10px solid rgb(14, 154, 75)',
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
            if(event.key === 'Enter' && textInput !== ""){
              await sendChatMessage(textInput)
              
              setTextInput("")
            }
          }}
        />
      </Box>

      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          border: '10px solid rgb(14, 154, 75)',
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button 
            variant="contained" 
            color="primary"
            onClick={async () => {
              openAIChatHistory.clearChatHistory()
              setLocalChatHistory(openAIChatHistory.getChatHistoryMessages())
            }}
          >
            Clear Chat
          </Button>
          <Button 
            variant="contained" 
            color="warning"
            onClick={async () => {
              await sendChatMessage("I need help")
            }}
          >
            Get Help
          </Button>
        </ButtonGroup>
      </Box>
    </Box>

      
  );
}

export default ChatList;

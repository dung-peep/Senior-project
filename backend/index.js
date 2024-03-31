import express from 'express'
import { openAI } from "./script.js"


const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/openAIResponseTest', async (req, res) => {
    
    const chatResponse = await openAI.chatCompletionResponse("Hello World!");
    res.json(chatResponse.data);
})

app.post('/queryOpenAIChatBot', async (req, res) => {
  const reqBody = req.body
  const chatMessage = reqBody.chatMessage

  const chatResponse = await openAI.chatCompletionResponse(chatMessage);
  res.json(chatResponse.data) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
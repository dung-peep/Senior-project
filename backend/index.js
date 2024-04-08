import express from 'express'
import { openAI } from "./script.js"


const app = express()
const port = 4000
app.use(express.json()) 

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  console.log(req.url, req.body)
  next()
})

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

app.post('/queryMentalChatBot', async (req, res) => {
  const reqBody = req.body
  
  const chatMessage = reqBody.chatMessage

  const chatResponse = await openAI.chatCompletionResponse(chatMessage);
  res.json(chatResponse.data) 
})

app.post('/queryInsultingChatBot', async (req, res) => {
  const reqBody = req.body
  
  const chatMessage = reqBody.chatMessage

  const chatResponse = await openAI.chatCompletionResponse(chatMessage);
  res.json(chatResponse.data) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
import express from 'express'
import { openAI } from "./openAI.js"


export const app = express()
export const port = 4000
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
    
  const chatResponse = await openAI.singleMessageInput("Hello World!");
  res.json(chatResponse.data);
})

app.post('/queryOpenAIChatBot', async (req, res) => {
  try{
    const reqBody = req.body
  
    const chatMessage = reqBody.chatMessage
    const chatResponse = await openAI.singleMessageInput(chatMessage);
    res.json(chatResponse.data) 
  }
  catch(err){
    console.log(err)
    res.status(500).send("An internal error occured")
  }
})

app.post('/queryMentalChatBot', async (req, res) => {
  try{
    const reqBody = req.body
    
    const chatMessageHistory = reqBody.chatMessageHistory

    const chatResponse = await openAI.mentalHealthBot(chatMessageHistory);
    res.json(chatResponse.data) 
  }
  catch(err){
    console.log(err)
    res.status(500).send("An internal error occured")
  }
})

app.post('/queryInsultingChatBot', async (req, res) => {
  try{
    const reqBody = req.body
    
    const chatMessageHistory = reqBody.chatMessageHistory

    const chatResponse = await openAI.insultBot(chatMessageHistory);
    res.json(chatResponse.data) 
  }
  catch(err){
    console.log(err)
    res.status(500).send("An internal error occured")
  }
})
import express from 'express'
import { openAI } from "./script.js"


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/openAIResponse', async (req, res) => {
    const chatResponse = await openAI.chatCompletionResponse("Hello World!")
    res.json(chatResponse.data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
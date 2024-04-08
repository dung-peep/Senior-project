import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import * as fsPromises from "fs/promises"
import * as fs from "fs"
import readline from "readline"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class OpenAICls {

  static #apiKey = undefined; // static and private variable
  static #openAIInstance = undefined;
  static #userInterface = undefined;
  static #parentPath = undefined;
  static #responseHistoryFilePath = undefined;
  static #chatHistoryFilePath = undefined;
  static #chatHistory = undefined;
  static #messageHistory = undefined;


  constructor(apiKey){
    if(OpenAICls.#apiKey === undefined){
      OpenAICls.#apiKey = apiKey;
    }
    

    if(OpenAICls.#openAIInstance === undefined){
      OpenAICls.#openAIInstance = new OpenAIApi(
        new Configuration({
          apiKey: OpenAICls.#apiKey,
        })
      );
    }

    if(OpenAICls.#userInterface === undefined){
      OpenAICls.#userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
    }

    if(OpenAICls.#parentPath === undefined){
      OpenAICls.#parentPath = path.join(__dirname, 'OpenAI')
      OpenAICls.#responseHistoryFilePath = path.join(OpenAICls.#parentPath, 'responses.json')
      OpenAICls.#chatHistoryFilePath = path.join(OpenAICls.#parentPath, 'chatHistory.json')
    }
  }

  #logChatGPTMessage = async (jsonObject) => {
    return this.#logChatMessage(jsonObject, OpenAICls.#parentPath, OpenAICls.#responseHistoryFilePath)
  }

  #logConversation = async (chatGPTMessages, userMessages) => {
    const response = userMessages.concat(chatGPTMessages)
    return this.#logChatMessage(response, OpenAICls.#parentPath, OpenAICls.#chatHistoryFilePath)
  }

  #logChatMessage = async (jsonObject, parentFolderPath, filePath) => { // may be prone to race condition depending on how host OS handles reading and writing
    const fileExists = fs.existsSync(filePath)
    if(fileExists){
      return fsPromises.readFile(filePath)
        .then((jsonValue) => {
          let listOfResponses = JSON.parse(jsonValue)

          if(!Array.isArray(listOfResponses)){
            listOfResponses = [listOfResponses]
          }

          if(Array.isArray(jsonObject)){
            listOfResponses.push(...jsonObject)
          }
          else{
            listOfResponses.push(jsonObject)
          }
          
          const jsonStr = JSON.stringify(listOfResponses, null, 4)

          fsPromises.writeFile(filePath, jsonStr)
        })
    }
    else{
      return fsPromises.mkdir(parentFolderPath, { recursive: true })
        .then((createDirResponse) => {
          let jsonStr = ""
          if(Array.isArray(jsonObject)){
            jsonStr = JSON.stringify([...jsonObject], null, 4)
          }
          else{
            jsonStr = JSON.stringify([jsonObject], null, 4)
          }
          
          fsPromises.writeFile(filePath, jsonStr)
        })
      
    }
  }

  #readChatHistory = async () => {
    try {
      const jsonValue = await fsPromises.readFile(OpenAICls.#responseHistoryFilePath);
      OpenAICls.#chatHistory = JSON.parse(jsonValue);
      OpenAICls.#messageHistory = OpenAICls.#chatHistory.map((chatMessageEntry) => choices[0].message.content).slice(-5)

      
    } catch (error) {
      // If file doesn't exist or cannot be read, initialize chatHistory as an empty array
      // this.chatHistory = [];
      OpenAICls.#messageHistory |= []
    }

    return OpenAICls.#messageHistory
  }

  singleMessageInput = async (input, role = "user") => {
    const messages = [{ role: role, content: input }]
    return this.#chatMessageCompletion(messages)
  }
  

  #validatechatHistoryJson = (chatHistory) => {
    const isValid = chatHistory.every((chatMessage) => {
      isObject = typeof chatMessage === 'object'
      hasCorrectProperties = chatHistory.hasOwnProperty('role') && chatHistory.hasOwnProperty('content')
      return isObject && hasCorrectProperties
    })

    return isValid
  }

  mentalHealthBot = async (chatHistory) => {
    chatPredicate = [{
      role: "system",
      content: "You are talking to a mental health bot. Please be aware that this bot is not a substitute for professional help. If you are in crisis, please call 911 or go to the nearest emergency room."
    }]

    chatHistory = chatPredicate.concat(chatHistory)

    return this.#chatMessageCompletion(chatHistory)
  }

  insultBot = async (chatHistory) => {
    chatPredicate = [{
      role: "system",
      content: "You are talking to an insult bot. Please do not take anything said by this bot personally."
    }]

    chatHistory = chatPredicate.concat(chatHistory)

    return this.#chatMessageCompletion(chatHistory)
  }


  #chatMessageCompletion = async (messages, modelName = "gpt-3.5-turbo") => {
    const isValid = this.#validatechatHistoryJson(messages)

    if(!isValid){
      throw new Error("Messages json is not a valid OpenAI message JSON object")
    }

    const response = await OpenAICls.#openAIInstance.createChatCompletion({
      model: modelName,
      messages: messages,
    })

    this.#logConversation(response.data.choices, messages)
    this.#logChatGPTMessage(response.data)
    
    return response
  }


  terminalInput = () => {
    OpenAICls.#userInterface.prompt()

    OpenAICls.#userInterface.on("line", async input => {
      const messages = [{ role: "user", content: input }]
      const response = await OpenAICls.#openAIInstance.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: messages,
        })
      
        console.log(response.data.choices[0].message.content)
        OpenAICls.#userInterface.prompt()

        this.#logConversation(response.data.choices.map((choice) => choice.message), messages)
        this.#logChatGPTMessage(response.data)
      })
    }
}


config()
export const openAI = new OpenAICls(process.env.OPEN_AI_API_KEY)
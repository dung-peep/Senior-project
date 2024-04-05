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
    }
    
  }

  #logChatGPTMessage = async (jsonObject) => {
    return this.#logChatMessage(jsonObject, OpenAICls.#parentPath, OpenAICls.#responseHistoryFilePath)
  }

  #logConversation = async () => {}
  
  #logChatMessage = async (jsonObject, parentFolderPath, filePath) => { // may be prone to race condition depending on how host OS handles reading and writing
    const fileExists = fs.existsSync(OpenAICls.#responseHistoryFilePath)
    if(fileExists){
      return fsPromises.readFile(OpenAICls.#responseHistoryFilePath)
        .then((jsonValue) => {
          const listOfResponses = JSON.parse(jsonValue)

          listOfResponses.push(jsonObject)
          const jsonStr = JSON.stringify(listOfResponses, null, 4)

          fsPromises.writeFile(filePath, jsonStr)
        })
    }
    else{
      return fsPromises.mkdir(OpenAICls.#parentPath, { recursive: true })
        .then((createDirResponse) => {
          const jsonStr = JSON.stringify([jsonObject], null, 4)
          fsPromises.writeFile(filePath, jsonStr)
        })
      
    }
  }

  #readChatHistory = async () => {

    try {
      const jsonValue = await fsPromises.readFile(OpenAICls.#responseHistoryFilePath);
      OpenAICls.#chatHistory = JSON.parse(jsonValue);
      OpenAICls.#messageHistory = OpenAICls.#chatHistory.map((chatMessageEntry)).slice(-5)
      // const messageHistory = jsonValue.map((value))
    } catch (error) {
      // If file doesn't exist or cannot be read, initialize chatHistory as an empty array
      this.chatHistory = [];
    }
  }

  chatCompletionResponse = async (input, modelName = "gpt-3.5-turbo", role = "user") => {
    const response = await OpenAICls.#openAIInstance.createChatCompletion({
      model: modelName,
      messages: [{ role: role, content: input }],
    })

    this.#logChatMessage(response.data)
    
    return response
    
  }

  terminalInput = () => {
    OpenAICls.#userInterface.prompt()

    OpenAICls.#userInterface.on("line", async input => {
      const response = await OpenAICls.#openAIInstance.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        })
      
        console.log(response.data.choices[0].message.content)
        OpenAICls.#userInterface.prompt()

        this.#logChatMessage()
        this.#logChatMessage(response.data)
      })
    }
}


config()
export const openAI = new OpenAICls(process.env.OPEN_AI_API_KEY)
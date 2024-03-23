import { config } from "dotenv"
import { Configuration, OpenAIApi } from "openai"
import * as fsPromises from "fs/promises"
import * as fs from "fs"
import readline from "readline"


class OpenAICls {

  static #apiKey = undefined; // static and private variable
  static #openAIInstance = undefined;

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
  }

  #logChatMessage = async (jsonObject) => { // may be prone to race condition depending on how host OS handles reading and writing
    const fileExists = fs.existsSync("./openAI/responses.json")
    if(!fileExists){
      const jsonStr = JSON.stringify([jsonObject], null, 4)
      fsPromises.writeFile("./openAI/responses.json", jsonStr)
    }
    else{
      fsPromises.mkdir('./openAI', { recursive: true })
      .then((createDirResponse) => {
        fsPromises.readFile("./openAI/responses.json")
          .then((jsonValue) => {
            const listOfResponses = JSON.parse(jsonValue)

            listOfResponses.push(jsonObject)
            const jsonStr = JSON.stringify(listOfResponses, null, 4)


            fsPromises.writeFile("./openAI/responses.json", jsonStr)

          })
      })
      
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





}


config()
export const openAI = new OpenAICls(process.env.OPEN_AI_API_KEY)

export const main = () => {
  
  
  // userInterface.prompt()

  // userInterface.on("line", async input => {

  //   const response = await openAi.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: input }],
  //   })
  
  //   // console.log("Chat GPT response: ", JSON.stringify(response.data))
  
  //   console.log(response.data.choices[0].message.content)
  //   userInterface.prompt()
  // })

}


  // const openAi = new OpenAIApi(
  //   new Configuration({
  //     apiKey: process.env.OPEN_AI_API_KEY,
  //   })
  // )
  
  // const userInterface = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // })
  
  // userInterface.prompt()
  // userInterface.on("line", async input => {
  
  //   const response = await openAi.createChatCompletion({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: input }],
  //   })
  
  //   console.log("Chat GPT response: ", JSON.stringify(response.data))
  
  //   console.log(response.data.choices[0].message.content)
  //   userInterface.prompt()
  // })
const backendURL = "http://localhost:4000"

export const openAIResponse = async (chatMessage = "") => {
    let endpoint = ""
    
    if(chatMessage){
        endpoint = "/openAIResponseTest"
    }
    else{
        endpoint = "/queryOpenAIChatBot"
    }

    const url = backendURL + endpoint;
    // return await fetch(url, {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         mode: "cors", // no-cors, *cors, same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, *same-origin, omit
    //         headers: {
    //         "Content-Type": "application/json",
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: "follow", // manual, *follow, error
    //         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         body: JSON.stringify(data), // body data type must match "Content-Type" header
    //     })
    //     .then(
    //         (res) => res.json(),
    //         (err) => {
    //             console.log(`An Error Occured while fetching url ${url}: `, err);
    //             throw err;
    //         }
    //     )
    //     .then(
    //         (responseJson) => responseJson.choices[0].message.content,
    //         (err) => {
    //             console.log(`An error occured while convert response from url ${url} to JSON: `, err);
    //             throw err;
    //         }
    //     )
};

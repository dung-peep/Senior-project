const backendURL = "http://localhost:4000"

const handleFetch = async (endpoint, fetchOptions, handlerFunc) => {
    const url = backendURL + endpoint;
    return await fetch(url, fetchOptions)
        .catch((err) => console.log(err))
        .then(
            (res) => {
                return res.json()
            },
            (err) => {
                console.log(`An Error Occured while fetching url ${endpoint}: `, err);
                throw err;
            }
        )
        .catch((err) => console.log(err))
        .then(
            (responseJson) => {
                return handlerFunc(responseJson)
            },
            (err) => {
                console.log(`An error occured while convert response from url ${endpoint} to JSON: `, err);
                throw err;
            }
        )
        .catch((err) => console.log(err))

}

const openAIDataHandler = (responseJson) => {
    debugger
    return responseJson.choices[0].message
}

export const openAISingleMessageChatBot = async (chatMessage = "") => {
    let endpoint = ""
    
    if(chatMessage === ""){
        endpoint = "/openAIResponseTest"
    }
    else{
        endpoint = "/queryOpenAIChatBot"
    }

    const data = {
        chatMessage: chatMessage
    }

    return await handleFetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    }, openAIDataHandler)
};

export const openAIMentalHealthChatBot = async (chatMessageHistory) => {
    const endpoint = "/queryMentalChatBot"

    const data = {
        chatMessageHistory
    }

    return await handleFetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    }, openAIDataHandler)
}

export const openAIInsultingChatBot = async (chatMessageHistory) => {
    const endpoint = "/queryInsultingChatBot"

    const data = {
        chatMessageHistory
    }

    return await handleFetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data)
    }, openAIDataHandler)
}

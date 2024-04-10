class chatHistoryHolder {
    static #chatHistory = [];

    constructor() {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
        if (chatHistory) {
            chatHistoryHolder.#chatHistory = chatHistory;
        }
    }
    
    addChat(chatMessage, chatRole) {
        const chat = {
            role: chatRole,
            content: chatMessage
        }
        chatHistoryHolder.#chatHistory.push(chat);
        localStorage.setItem("chatHistory", JSON.stringify(chatHistoryHolder.#chatHistory));
    }

    deleteChat(index) {
        chatHistoryHolder.#chatHistory.splice(index, 1);
        localStorage.setItem("chatHistory", JSON.stringify(chatHistoryHolder.#chatHistory));
    }

    getChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
        chatHistoryHolder.#chatHistory = chatHistory;
        return chatHistoryHolder.#chatHistory;
    }

    getChatHistoryMessages() {
        return chatHistoryHolder.#chatHistory.map((chat) => chat.content);
    }

    clearChatHistory() {
        chatHistoryHolder.#chatHistory = [];
        // localStorage.setItem("chatHistory", JSON.stringify(chatHistoryHolder.#chatHistory));
        localStorage.removeItem("chatHistory");
    }


}


export const openAIChatHistory = Object.freeze(new chatHistoryHolder());

export default openAIChatHistory;


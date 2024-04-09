class chatHistoryHolder {
    static #chatHistory = [];

    addChat(chatMessage, chatRole) {
        const chat = {
            role: chatRole,
            content: chatMessage
        }
        chatHistoryHolder.#chatHistory.push(chat);
    }

    getChatHistory() {
        return chatHistoryHolder.#chatHistory;
    }
}


export const openAIChatHistory = Object.freeze(new chatHistoryHolder());

export default openAIChatHistory;

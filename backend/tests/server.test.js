import { app } from "../server.js";
import supertest from "supertest";
import { openAI } from "../openAI.js";
import { describe, expect, test } from '@jest/globals';


const validateOpenAIResponse = (response) => {
    expect(response.status).toBe(200);
    
    expect(response.body).toHaveProperty("choices");
    expect(response.body.choices.length).toBeGreaterThan(0);
    expect(response.body.choices[0]).toHaveProperty("message");

    expect(response.body.choices[0].message).toHaveProperty("content");
    expect(response.body.choices[0].message.content).not.toBe("");

    expect(response.body.choices[0].message).toHaveProperty("role");
    expect(response.body.choices[0].message.role).not.toBe("");
};

// openAI.terminalInput()
describe("Test suite for backend", () => {
    
    test("Server is running", async () => {
        const response = await supertest(app).get("/");
        expect(response.status).toBe(200);
    })
    
    test("GET /", async () => {
        const response = await supertest(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World!");
    })
    
    test("GET /openAIResponseTest", async () => {
        const response = await supertest(app).get("/openAIResponseTest");
        validateOpenAIResponse(response);
        expect(response.status).toBe(200);
    })
    
    test("POST /queryOpenAIChatBot", async () => {
        const response = await supertest(app).post("/queryOpenAIChatBot").send({ chatMessage: "Hello World!"});
        validateOpenAIResponse(response);
        expect(response.status).toBe(200);
    })
    
    test("POST /queryMentalChatBot", async () => {
        const response = await supertest(app).post("/queryMentalChatBot").send({chatMessageHistory: {role: "user", content: "Hello World!"}});
        validateOpenAIResponse(response);
        expect(response.status).toBe(200);
    })
    
    test("POST /queryInsultingChatBot", async () => {
        const response = await supertest(app).post("/queryInsultingChatBot").send({chatMessageHistory: {role: "user", content: "Hello World!"}});
        validateOpenAIResponse(response);
        expect(response.status).toBe(200);
    })
})

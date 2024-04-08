import { app } from "..";
import supertest from "supertest";
import { validateOpenAIResponse } from "./testUtils";
import { openAI } from "../script.js";

beforeEach((done) => {
    
});

afterEach((done) => {
    
});

test("test OpenAI backend", async () => {
    openAI.singleMessageInput("Hello World!").then((response) => {
        validateOpenAIResponse(response);
    });
})

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
export const validateOpenAIResponse = (response) => {
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("choices");
    expect(response.body.choices.length).toBeGreaterThan(0);
    expect(response.body.choices[0]).toHaveProperty("text");
    expect(response.body.choices[0].text).not.toBe("");
};
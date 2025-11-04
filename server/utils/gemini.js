const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
});

const cleanJsonResponse = (rawText) => {
  let cleaned = rawText.replace(/```json|```/g, '');
  
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    try {
      cleaned = cleaned.replace(/[\u0000-\u001F\u007F-\u009F]/g, match => {
        return '\\u' + ('0000' + match.charCodeAt(0).toString(16)).slice(-4);
      });
      return JSON.parse(cleaned);
    } catch (e2) {
      console.error("Failed to parse JSON after cleaning:", e2);
      throw e2;
    }
  }
};

module.exports = { chatSession, cleanJsonResponse };

import { GoogleGenAI, Type } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyEmpowerment = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Give me a short, powerful daily empowerment quote and a one-sentence tip for women in business for kuzaBabygirl platform.',
    });
    // The response.text property directly returns the generated string output.
    return response.text;
  } catch (error) {
    console.error("Error fetching empowerment:", error);
    return "You are stronger than you think. Keep pushing boundaries.";
  }
};

export const getDailyChallengeQuestions = async (): Promise<any[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Generate 3 difficult MCQ questions about women’s history, professional rights, or social empowerment. Each should have 4 options and a correct index.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctIndex: { type: Type.NUMBER }
            },
            required: ['question', 'options', 'correctIndex']
          }
        }
      }
    });
    // The response.text property directly returns the generated string output.
    const jsonStr = response.text?.trim() || '[]';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error fetching MCQs:", error);
    return [
      {
        question: "Which of these is a key strategy for closing the gender pay gap?",
        options: ["Salary transparency", "Working longer hours", "Avoiding negotiation", "Switching jobs monthly"],
        correctIndex: 0
      },
      {
        question: "In what year was the first international women's day recognized by the UN?",
        options: ["1945", "1975", "1990", "2000"],
        correctIndex: 1
      },
      {
        question: "What does 'Glass Ceiling' refer to in professional settings?",
        options: ["Architecture style", "Transparent office walls", "Unseen barriers to advancement", "Safety regulations"],
        correctIndex: 2
      }
    ];
  }
};

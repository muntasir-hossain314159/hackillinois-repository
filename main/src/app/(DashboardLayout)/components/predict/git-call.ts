// openaiService.ts
import { OpenAI } from "openai";
// import * as dotenv from "dotenv";

// dotenv.config();

const openaiKey="";

// const openaiKey = process.env.OPENAI_API_KEY as string;
const openai = new OpenAI({
  apiKey: openaiKey,
  dangerouslyAllowBrowser: true,
});

export const generateResponse = async (
  data: string,
  saving: number
): Promise<string> => {
  try {
    const modelId = "gpt-3.5-turbo-instruct"; // Adjust model ID as needed

    const prompt = `Predict how much I would spend in a week if I spent $30 on groceries already. RETURN THE RESPONSE LIKE THIS JSON FORMAT ONLY!!!!! 
    {"predicted_daily_savings": [], "predicted_daily_costs":[]}`;

    const result = await openai.completions.create({
      model: modelId,
      prompt: prompt,
      max_tokens: 500,
    });

    return result.choices[0].text;
  } catch (err) {
    console.error(err);
    return "";
  }
};

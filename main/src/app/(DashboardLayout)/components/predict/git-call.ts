// openaiService.ts
import { OpenAI } from "openai";
// import * as dotenv from "dotenv";

// dotenv.config();

const openaiKey = "";

// const openaiKey = process.env.OPENAI_API_KEY as string;
const openai = new OpenAI({
  apiKey: openaiKey,
  dangerouslyAllowBrowser: true,
});

export const generateResponse = async (
  data: string
): Promise<string> => {
  try {
    const modelId = "gpt-3.5-turbo-instruct"; // Adjust model ID as needed

    const prompt = `${data} is an array transactions over 90 days. Based on my spending habits, extrapolate the next 10 days worth of spending. RETURN THE RESPONSE LIKE THIS JSON FORMAT ONLY!!!!! 
    {predicted_daily_costs: [{x: Date, y: Number}]} such as {predicted_daily_costs:[ {x: 2023-02-24, y: 10.5}], {x: 2023-02-25, y: 10.5} ]}`;

    const result = await openai.completions.create({
      model: modelId,
      prompt: prompt,
      max_tokens: 1000,
    });

    return result.choices[0].text;
  } catch (err) {
    console.error(err);
    return "";
  }
};

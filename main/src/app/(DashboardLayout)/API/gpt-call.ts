// openaiService.ts
import { OpenAI } from "openai";
// import * as dotenv from "dotenv";

// dotenv.config();

const openaiKey="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"

// const openaiKey = process.env.OPENAI_API_KEY as string;
const openai = new OpenAI({
  apiKey: openaiKey,
  dangerouslyAllowBrowser: true,
});

export const generateResponse = async (data: string, saving: number): Promise<string> => {
  try {
    const modelId = "gpt-3.5-turbo-instruct"; // Adjust model ID as needed

    const prompt = `${data} is an array that consists of 90 elements. Each element is an object containing the date and amount the person spent on that date. 
    Taking this ${data} into account, find the pattern in their weekly spending and suggest how much they should be spending and saving every day in a week so that they can meet their ${saving} goal for the month.
    Return a JSON response where the first key (daily_savings) is an array of 7 elements. Each element in the array is the suggested saving for that day starting from Monday. The second key (daily_costs) is another array of 7 elements. Each element in the array is the suggested spending for that day starting from Monday. LOGICALLY PREDICT WHAT THE DAILY DOLLAR VALUE TO SPEND AND SAVE SHOULD BE FOR THE USER. NO VALUE SHOULD BE 0. ONLY RETURN THE ARRAYS IN A JSON FORMAT WITH THE FIRST KEY AS daily_savings AND THE SECOND AS daily_costs.
    RETURN THE RESPONSE LIKE THIS JSON FORMAT WITH VALUES ROUNDED TO 2 DECIMAL PLACES AND NOTHING ELSE {"daily_savings": [], "daily_costs": []}`


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

// openaiService.ts
import { OpenAI } from "openai";
// import * as dotenv from "dotenv";

// dotenv.config();

const openaiKey=""

// const openaiKey = process.env.OPENAI_API_KEY as string;
const openai = new OpenAI({
  apiKey: openaiKey,
  dangerouslyAllowBrowser: true,
});

export const generateResponse = async (data: string, saving: number): Promise<string> => {
  try {
    const modelId = "gpt-3.5-turbo-instruct"; // Adjust model ID as needed

    const prompt = `${data} 
    Taking this array into account, find the pattern in their spending based on the day of the week. The user wants to save ${saving} as their goal for the month. If there was no number in that last sentence, assume they want to save 1000$ a month. Divide the amount they want to save per week by 4 to estimate a month. This amount is the max you can divy up between the two arrays you must create.
    YOUR TASK: Return a JSON response where the first key (daily_savings) is an array of 7 elements. The second key (daily_costs) is another array of 7 elements. Each element in the array is the suggested spending for that day starting from Sunday. YOU MUST ONLY RETURN THE ARRAYS IN A JSON FORMAT WITH THE FIRST KEY AS daily_savings AND THE SECOND AS daily_costs.
    RETURN THE RESPONSE LIKE THIS JSON FORMAT ONLY!!!!! {
  "daily_savings": [
    20.00,
    39.27,
    16.26,
    63.31,
    54.42,
    33.77,
    49.65
  ],
  "daily_costs": [
    50.03,
    106.88,
    87.60,
    57.61,
    107.59,
    60.01,
    100.08
  ]
}` 


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

// // openaiService.ts
// import { OpenAI } from "openai";
// // import * as dotenv from "dotenv";

// // dotenv.config();

// const openaiKey = "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";

// // const openaiKey = process.env.OPENAI_API_KEY as string;
// const openai = new OpenAI({
//   apiKey: openaiKey,
//   dangerouslyAllowBrowser: true,
// });

// export const generateResponse = async (
//   data: string
// ): Promise<string> => {
//   try {
//     const modelId = "gpt-3.5-turbo-instruct"; // Adjust model ID as needed

//     const prompt = `${data} is an array transactions over 90 days. Based on my spending habits, extrapolate the next 7 days worth of spending. RETURN THE RESPONSE LIKE THIS JSON FORMAT ONLY!!!!! 
//     {"predicted_daily_costs":[[date: string, predicted_cost: number]]} such as {"predicted_daily_costs":[["2023-01-12", 10.5], ["2023-01-13", 11]]}`;

//     const result = await openai.completions.create({
//       model: modelId,
//       prompt: prompt,
//       max_tokens: 1000,
//     });

//     return result.choices[0].text;
//   } catch (err) {
//     console.error(err);
//     return "";
//   }
// };

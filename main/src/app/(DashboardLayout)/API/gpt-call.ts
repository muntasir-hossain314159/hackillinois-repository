// import { OpenAI } from "openai";
// import * as dotenv from "dotenv";

// dotenv.config();

// const openaiKey = process.env.OPENAI_API_KEY as string;
// const openai = new OpenAI({
//   apiKey: openaiKey,
//   dangerouslyAllowBrowser: true,
// }); 

// export const generateResponse = async (prompt: string): Promise<string> => {
//   try {
//     const modelId = "gpt-3.5-turbo-instruct"; // Adjust model ID as needed

//     const result = await openai.completions.create({
//       model: modelId,
//       prompt: prompt,
//       max_tokens: 500,
//     });

//     return result.choices[0].text;
//   } catch (err) {
//     console.error(err);
//     return "";
//   }
// };

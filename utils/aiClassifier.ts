import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function classifyDream(dreamName: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a dream classifier. Respond ONLY with Good or Bad.'
      },
      {
        role: 'user',
        content: `Classify this dream: ${dreamName}`
      }
    ],
    temperature: 0
  });

  return response.choices[0].message.content?.trim();
}

import { AIGenerationPrompt } from '../types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateAIContent = async (prompt: AIGenerationPrompt): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a retail industry expert who writes engaging blog content."
        },
        {
          role: "user",
          content: `Write a blog post about ${prompt.topic}. Include keywords: ${prompt.keywords.join(', ')}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
};
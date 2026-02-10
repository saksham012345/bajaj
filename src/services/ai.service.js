import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const generateAiWord = async (input) => {
    if (!process.env.GEMINI_API_KEY) throw new Error('500');

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
            {
                contents: [{ parts: [{ text: `Respond with exactly ONE word to: ${input}` }] }]
            },
            {
                headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY }
            }
        );

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error";
        const word = text.trim().split(/\s+/)[0].replace(/[^a-zA-Z0-9]/g, '');

        if (!word) throw new Error('500');
        return word;
    } catch (error) {
        throw new Error('500');
    }
};

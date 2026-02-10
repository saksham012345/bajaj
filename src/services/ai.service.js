import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const generateAiWord = async (input) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('500');
    }

    try {
        const aiResponse = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: `Respond with exactly ONE word to: ${input}` }] }]
            }
        );

        const text = aiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";
        const words = text.trim().split(/\s+/);
        return words[0].replace(/[^a-zA-Z0-9]/g, '');
    } catch (error) {
        console.error('AI Service Error:', error.message);
        throw new Error('500');
    }
};

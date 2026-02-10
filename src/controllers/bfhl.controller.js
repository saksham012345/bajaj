import { getFibonacci, isPrime, getLCM, getHCF } from '../services/math.service.js';
import { generateAiWord } from '../services/ai.service.js';
import { validateBfhlInput } from '../utils/validators.js';
import dotenv from 'dotenv';

dotenv.config();

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "saksham2138.be23@chitkara.edu.in";

export const handleBfhl = async (req, res) => {
    try {
        if (!validateBfhlInput(req.body)) {
            throw new Error('400');
        }

        const key = Object.keys(req.body)[0];
        const value = req.body[key];
        let resultData = null;

        switch (key) {
            case 'fibonacci':
                resultData = getFibonacci(value);
                break;
            case 'prime':
                resultData = value.filter(n => isPrime(n));
                break;
            case 'lcm':
                resultData = getLCM(value);
                break;
            case 'hcf':
                resultData = getHCF(value);
                break;
            case 'AI':
                resultData = await generateAiWord(value);
                break;
            default:
                throw new Error('400');
        }

        res.json({
            is_success: true,
            official_email: OFFICIAL_EMAIL,
            data: resultData
        });

    } catch (error) {
        const statusCode = error.message === '500' ? 500 : 400;
        res.status(statusCode).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL
        });
    }
};

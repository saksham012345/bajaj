import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "saksham2138.be23@chitkara.edu.in";

app.use(cors());
app.use(express.json());

const getFibonacci = (n) => {
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) throw new Error('400');
    if (n === 0) return [];
    if (n === 1) return [0];

    const sequence = [0, 1];
    let a = 0;
    let b = 1;

    for (let i = 2; i < n; i++) {
        let c = a + b;
        sequence.push(c);
        a = b;
        b = c;
    }
    return sequence;
};

const isPrime = (n) => {
    if (typeof n !== 'number' || !Number.isInteger(n)) return false;
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
};

const getGCD = (a, b) => {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
};

const getLCM = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) throw new Error('400');
    let ans = arr[0];
    for (let i = 1; i < arr.length; i++) {
        ans = (ans * arr[i]) / getGCD(ans, arr[i]);
    }
    return ans;
};

const getHCF = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) throw new Error('400');
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = getGCD(result, arr[i]);
    }
    return result;
};

app.get('/health', (req, res) => {
    res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL
    });
});

app.get('/bfhl', (req, res) => {
    res.json({
        "operation_code": 1
    });
});

app.post('/bfhl', async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        if (keys.length !== 1) throw new Error('400');

        const key = keys[0];
        const value = req.body[key];
        let resultData = null;

        switch (key) {
            case 'fibonacci':
                resultData = getFibonacci(value);
                break;
            case 'prime':
                if (!Array.isArray(value) || value.length === 0 || !value.every(Number.isInteger)) throw new Error('400');
                resultData = value.filter(n => isPrime(n));
                break;
            case 'lcm':
                if (!Array.isArray(value) || value.length === 0 || !value.every(Number.isInteger)) throw new Error('400');
                resultData = getLCM(value);
                break;
            case 'hcf':
                if (!Array.isArray(value) || value.length === 0 || !value.every(Number.isInteger)) throw new Error('400');
                resultData = getHCF(value);
                break;
            case 'AI':
                if (typeof value !== 'string') throw new Error('400');
                if (!process.env.GEMINI_API_KEY) throw new Error('500');

                try {
                    const aiResponse = await axios.post(
                        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
                        {
                            contents: [{ parts: [{ text: `Respond with exactly ONE word to: ${value}` }] }]
                        }
                    );
                    const text = aiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";
                    const words = text.trim().split(/\s+/);
                    resultData = words[0].replace(/[^a-zA-Z0-9]/g, '');
                } catch (e) {
                    throw new Error('500');
                }
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
});

app.listen(PORT, () => { });

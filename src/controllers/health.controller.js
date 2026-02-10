import dotenv from 'dotenv';

dotenv.config();

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || "saksham2138.be23@chitkara.edu.in";

export const getHealth = (req, res) => {
    res.json({
        is_success: true,
        official_email: OFFICIAL_EMAIL
    });
};

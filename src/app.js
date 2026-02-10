import express from 'express';
import cors from 'cors';
import bfhlRoutes from './routes/bfhl.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/bfhl', bfhlRoutes);
app.use('/health', healthRoutes);

export default app;

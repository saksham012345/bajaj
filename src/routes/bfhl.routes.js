import { Router } from 'express';
import { handleBfhl } from '../controllers/bfhl.controller.js';

const router = Router();

router.post('/', handleBfhl);

export default router;

import express from 'express';
import { createResidency, getAllResidencies, getResidency } from '../controllers/residencyController.js';
import jwtCheck from '../middleware/jwt.js';

const router = express.Router();


router.post('/create', jwtCheck, createResidency);
router.get('/allresd', getAllResidencies);
router.get('/:id', getResidency);

export { router as residencyRoute}

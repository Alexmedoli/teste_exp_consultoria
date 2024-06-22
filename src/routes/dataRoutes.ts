import { Router } from 'express';
import { getData } from '../controllers/dataController';

const router = Router();

router.get('/:chartType', getData);

export default router;
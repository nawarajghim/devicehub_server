import express from 'express';
import {getRuuviData, postRuuviData} from '../controllers/ruuviController';

const router = express.Router();

router.get('/', getRuuviData);
router.post('/', postRuuviData);

export default router;
import express from 'express';
import {getAdmin, login} from '../controllers/loginController';
import {authenticate} from '../../middlewares';

const router = express.Router();

router.get('/', getAdmin);
router.post('/', login);

export default router;

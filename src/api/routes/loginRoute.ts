import express from 'express';
import {
  getUserRole,
  login,
  postNewPassword,
} from '../controllers/loginController';

const router = express.Router();

router.post('/', login);
router.post('/role', getUserRole);
router.post('/password', postNewPassword);

export default router;

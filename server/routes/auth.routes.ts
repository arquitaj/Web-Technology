import {Router} from 'express';
import { loginUser } from '../controllers/auth.controller';

const router = Router();
router.use('/auth', loginUser);

export default router;
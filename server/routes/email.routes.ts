import {Router} from 'express';
import { sendEmail } from "../controllers/email.controller"

// POST endpoint to trigger the email sending functionality
const router = Router();
router.post("/sendEmail", sendEmail);

export default router;
import { Router } from "express"
import { addDocument, fetchDocuments } from "../controllers/document.controller"
import multer from 'multer'

// Use memoryStorage so the file is available in req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = Router();
router.post('/uploadDocument', upload.single('myFile'), addDocument);
router.get('/allDocuments', fetchDocuments);

export default router;


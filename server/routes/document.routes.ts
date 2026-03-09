import { Router } from "express"
import { addDocument, fetchDocuments, deleteDocument, viewDocument, updateDocument, searchDocuments } from "../controllers/document.controller"
import multer from 'multer'

// Use memoryStorage so the file is available in req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = Router();
router.post('/uploadDocument', upload.single('myFile'), addDocument); // Upload a new document with a file
router.put('/updateDocument', upload.single('myFile'), updateDocument); // Update an existing document and optionally replace its file
router.get('/allDocuments', fetchDocuments); // Get all stored documents
router.get('/searchDocuments', searchDocuments); // Search documents based on query parameters
router.delete('/deleteDocument/:documentNo', deleteDocument); // Delete a document using its document number
router.get('/viewDocument/:documentNo', viewDocument); // View a specific document using its document number


export default router;

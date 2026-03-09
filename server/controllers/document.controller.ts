import { Response, Request } from "express";
import { Document } from '../models/document.model'
import {storage} from '../config/firebase'
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import { addEmployee } from "./user.controller";

// Fetch all documents from the database
export const fetchDocuments = async(req: Request, res: Response) => {
    try{
        // Retrieve all document records
        const documents = await Document.find();
        // Send successful response with documents list
        return res.status(200).json({success: true, message: "Documents fetched successfully", documents});
    }catch(error){
        // Handle errors while fetching documents
        return res.status(400).json({success: false, message: "Error: ", error})
    }
}

// Delete a document from database and Firebase storage
export const deleteDocument = async(req: Request, res: Response) => {
    try{
        // Get document number from request params
        const {documentNo} = req.params;

        // Get file path from request body
        const {file} = req.body;

        // Remove document record from database
        const document = await Document.findOneAndDelete({documentNo:documentNo});
        
        // Create Firebase storage reference for the file
        const urlFile = ref(storage, file);
        
        // Delete the file from Firebase storage
        await deleteObject(urlFile);
        if(document){
            return res.status(200).json({success: true, message: "Successfully deleted document"});
        }
    }catch(error){
        // Return error if document deletion fails
        return res.status(400).json({success: false, message: "Document not found!"});
    }
}

// View or access a specific document
export const viewDocument = async(req:Request, res: Response) => {
    try{ 
        // Get document identifier
        const {documentNo} = req.params;

        // Get file reference and issuance type
        const {file, issuanceType} = req.body;

        // Create Firebase reference for the fil
        const urlFile = ref(storage, file);
        
        // Function to open file in new browser tab
        const openInNewTab = (url: string) => {
            window.open(url, "_blank");
        };
    }catch(error){
        // Handle file loading errors
        return res.status(400).json({success: false, message: "Error to load the file!"});
    }
}

// Search documents using query filters
export const searchDocuments = async(req:Request, res: Response) => {
    try{ 
        // Get query parameters from request
        const filters = req.query;

        // Create dynamic search query
        const query: Record<string, any> = {};

        // Loop through filters and build regex search
        Object.keys(filters).forEach((key) => {
            const value = filters[key];
            if (value) {
                query[key] = { $regex: value as string, $options: "i" };
            }
        });

        // Execute search query in database
        const documents = await Document.find(query);
        return res.status(200).json({success: true, message: "Documents fetched successfully", documents});       
    }catch(error){
        // Handle search errors
        return res.status(400).json({success: false, message: "Error to load the file!"});
    }
}

// Update an existing document
export const updateDocument = async(req: Request, res: Response) => {
    try{
        // Uploaded file data from request
        const fileData = req.file;

        // Extract document fields from request body
        const {documentNo, newDocumentNo ,issuanceType, series, date, subject, keyword, oldFile, newFile} = req.body;
        
        // Default file URL remains the old file
        let urlFile = oldFile;

        // If a new file is uploaded, replace the existing file
        if(fileData){
            // Delete old file from Firebase
            const fileRef = ref(storage, oldFile);
            await deleteObject(fileRef);

            // Upload new file to Firebase storage
            console.log("New image", fileData.originalname);
            const imageRef = ref(storage, `${issuanceType}/${fileData?.originalname}`);
            await uploadBytes(imageRef, fileData.buffer, {
                contentType: fileData.mimetype,
            });

            // Get new file URL after upload
            urlFile = await getDownloadURL(imageRef);
            console.log("New URL: ", urlFile);
        }
        console.log("old File is : "+urlFile);
        
         // Document filter condition
         const filter = {documentNo:documentNo};

            // Updated document fields
            const update = {
                documentNo : newDocumentNo,
                issuanceType : issuanceType,
                series : series,
                date : date,
                subject : subject,
                keyword : keyword,
                file: urlFile,
                employeeID: "00001"
            };
            // Update document in database
            const response = await Document.findOneAndUpdate(filter, update,{
                new: true,
                runValidators: true //to ensure the schema validation
            });

            if(!response){
                return res.status(400).json({success: false, message:"Document doesn't exist!"});
            }else{
                return res.status(200).json({success: true, message:"Successfully updated Document!"});
            }
    }catch(error){
        // Handle update errors
        return res.status(400).json({success: false, message: "Error to Update file!"});
    }
}

// Add a new document
export const addDocument = async(req: Request, res: Response) => {
    try{
        // Uploaded file information
        const fileData = req.file;

        // Extract document details from request body
        const {documentNo, issuanceType, series, date, subject, keyword, file} = req.body;

         // Check if document already exists
        const existingDoc = await Document.findOne({ documentNo });
        if (existingDoc) {
            return res.status(401).json({ success: false, message: "Document already exists!" });
        }
        const response = await Document.findOne({documentNo:documentNo});
        if(!response){

            // Upload file to Firebase storage
            const imageRef = ref(storage, `${issuanceType}/${fileData.originalname}`);
            await uploadBytes(imageRef, fileData.buffer, {
                contentType: fileData.mimetype,
            });

            // Get public download URL
            const url = await getDownloadURL(imageRef);

            // Create new document object
            const newDocument = new Document({
                documentNo : documentNo,
                issuanceType : issuanceType,
                series : series,
                date : date,
                subject : subject,
                keyword : keyword,
                file : url,
                uploadDate : new Date(),
                employeeID : "00001",
            })

            // Save document to database
            await newDocument.save();
            return res.status(200).json({success: true, message: "Successfully upload new document!"});
        }else{
            return res.status(401).json({success: false, message: "Document already exist!"});
        }
    }catch{
        // Handle document creation errors
        return res.status(401).json({success: false, message: "Failed to add new document!"});
        
    }
}


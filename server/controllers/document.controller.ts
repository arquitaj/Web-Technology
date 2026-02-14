import { Response, Request } from "express";
import { Document } from '../models/document.model'

//To fetch all documents
export const fetchDocuments = async(req: Request, res: Response) => {
    try{
        const documents = await Document.find();
        return res.status(200).json({success: true, message: "Documents fetched successfully", documents});
    }catch(error){
        return res.status(400).json({success: false, message: "Error: ", error})
    }
}

// To delete documents
export const deleteDocument = async(req: Request, res: Response) => {
    try{
        const {documentNo} = req.params;
        console.log(documentNo);
        const document = await Document.findOneAndDelete({documentNo:documentNo});
        if(document){
            return res.status(200).json({success: true, message: "Successfully deleted document"});
        }
    }catch(error){
        return res.status(400).json({success: false, message: "Document not found!"});
    }
}

//To view document
export const viewDocument = async(req:Request, res: Response) => {
    try{
        const {documentNo} = req.params;
        const document = await Document.findOne({documentNo:documentNo});
        if(document && document.file){
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.setHeader('Content-Disposition', `inline; filename="${document.documentNo}.pdf"`);
            return res.send(document.file);
        }else{
            return res.status(400).json({success: false, message: "File not found!"});
        }
    }catch(error){
        return res.status(400).json({success: false, message: "Error to load the file!"});
    }
}
//To addDocuments
export const addDocument = async(req: Request, res: Response) => {
    try{
        const fileData = req.file;
        const {documentNo, issuanceType, series, date, subject, keyword, file} = req.body;
        const response = await Document.findOne({documentNo:documentNo});
        if(!response){
            const newDocument = new Document({
                documentNo : documentNo,
                issuanceType : issuanceType,
                series : series,
                date : date,
                subject : subject,
                keyword : keyword,
                file : fileData?.buffer,
                uploadDate : new Date(),
                employeeID : "00001",
            })
            await newDocument.save();
            return res.status(200).json({success: true, message: "Successfully upload new document!"});
        }else{
            return res.status(401).json({success: false, message: "Document already exist!"});
        }
    }catch{
        return res.status(401).json({success: false, message: "Failed to add new document!"});
        
    }
}
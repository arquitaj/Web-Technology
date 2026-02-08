import { Response, Request } from "express";
import { Document } from '../models/document.model'

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
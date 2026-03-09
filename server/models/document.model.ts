import {Schema, model} from 'mongoose';

// Create a MongoDB model called "Document" using a defined schema
export const Document = model ('Document', new Schema({

    // Unique or reference number assigned to the document
    documentNo : {type: String, required: false},

    // Type/category of the issued document (required field)
    issuanceType: {type: String, required: true},

    // Optional series identifier for document grouping
    series: {type: String, required: false},

    // Date when the document was issued (required)
    date: {type: Date, required: true},

    // Short description or subject of the document
    subject: {type: String, required: false},

    // Keyword used for searching or filtering documents
    keyword: {type: String, required: false},

    // File path or filename of the uploaded document (required)
    file: {type: String, required: true},

    // Date when the document was uploaded to the system
    uploadDate: {type: Date, required: false},

    // ID of the employee who uploaded or owns the document
    employeeID: {type: String, require: true},

}, {collection: "document"})); 

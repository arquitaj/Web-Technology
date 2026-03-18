import {Schema, model} from 'mongoose';
export const ForwardedDocument = model ('ForwardedDocument', new Schema({
    documentNo : {type: String, required: true},
    sharedWith: [
        {
        userID: { type: String, required: true },
        acknowledgementDate: {type: Date, required: true},
        status: {type: String, require: true},
        }
    ],
}, {collection: "acknowledgement"})); 

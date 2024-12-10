import mongoose from "mongoose";

const emailDataSchema = new mongoose.Schema({    
    name:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
    
},{timestamps: true});

const EmailData = mongoose.model('EmailData', emailDataSchema);

export default EmailData;
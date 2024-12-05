import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({    
    title : String,
    pid : String,
    reasearchPaperPath : String,
    presentationPath : String,
    status : String,
    marks : {type : Number,default:0},
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    
},{timestamps: true});

const Paper = mongoose.model('Paper', paperSchema);

export default Paper;
import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
    title : String,
    trackNo : String,
    description : String,
    date : Date,
    time : String,
    paper : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Paper' }],
    sessionChair : String,
    supervisor : String,
    rapparteur : String,
    venue : String,
    facultyCoordinator : String,
    meetingLink: String,

},{timestamps: true});

const Track = mongoose.model('Track', trackSchema);

export default Track;
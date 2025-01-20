    import mongoose from "mongoose";

    const sessionSchema = new mongoose.Schema({
        email: String,
        password: String,
        track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
    },{timestamps: true});

    const Session = mongoose.model('Session', sessionSchema);

    export default Session;
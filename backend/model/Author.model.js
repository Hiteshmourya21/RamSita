import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    title: String,
    pid: { type: String, required: true, unique: true },
    email: { type: String, required: true }, // Removed the unique constraint
    password: String,
    members: [
      {
        name: { type: String, required: true },
        attendance: { type: Boolean, default: false },
      },
    ],
    presentationPath: String,
    status: { type: String, default: "pending" },
    scores: {
      originality: { type: Number, default: 0 },
      relevance: { type: Number, default: 0 },
      quality: { type: Number, default: 0 },
      clarity: { type: Number, default: 0 },
      presentation: { type: Number, default: 0 },
      marks: { type: Number, default: 0 }
    },
    isOnline: { type: Boolean, default: false },
    meetingDetails:{
      meetingLink: { type: String },
      startTime: { type: String },
      endTime: { type: String }
    },
    presenter: {
      name: { type: String },
    },
    track: { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;

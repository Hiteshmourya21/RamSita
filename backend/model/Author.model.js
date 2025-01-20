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
    marks: { type: Number, default: 0 },
    presenter: {
      name: { type: String },
    },
    track: { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;

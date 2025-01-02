import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import authRoutes from "./routes/auth/auth.route.js";
import adminRoutes from "./routes/admin/admin.route.js";
import authorRoutes from "./routes/author/author.route.js";
import sessionRoutes from "./routes/EmailData/emailData.route.js";

import { connectDB } from "./lib/db.js";
import EmailData from "./model/EmailData.model.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); //parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/author", authorRoutes)
app.use("/api/v1/session", sessionRoutes)

app.post("/register/faculty", (req, res) => {
    const {name,email} = req.body;
    try{
        const newFaculty = new EmailData({name,email});
        newFaculty.save();
        res.status(201).json({ message: "Faculty registered successfully." });
    }
    catch(err){
        console.error(err);
    }
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    connectDB();
})
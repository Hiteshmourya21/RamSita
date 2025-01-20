import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import path from "path";

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
const __dirname = path.resolve();

const allowedOrigins = ["http://localhost:3000"];
if(process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true, // Allow credentials (cookies, headers)
    })
  );
}

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/author", authorRoutes)
app.use("/api/v1/session", sessionRoutes)

app.post("/api/v1/register/faculty", async(req, res) => {
    const {name,email,type} = req.body;
    try{
        const existingFaculty = await EmailData.findOne({ email });
        
        if (existingFaculty) {
            // If email already exists, send an appropriate response
            return res.status(400).json({ message: "Email already exists." });
        }

        const newFaculty = new EmailData({name,email,type});
        newFaculty.save();
        res.status(201).json({ message: "Faculty registered successfully." });
    }
    catch(err){
        console.error(err);
    }
})



if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  
  // Catch-all handler to serve index.html for any route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
  }

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    connectDB();
})
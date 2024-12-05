import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import authRoutes from "./routes/auth/auth.route.js";
import adminRoutes from "./routes/admin/admin.route.js";

import { connectDB } from "./lib/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); //parse JSON request body
app.use(cors("http://localhost:3000/"))
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/admin", adminRoutes)

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    connectDB();
})
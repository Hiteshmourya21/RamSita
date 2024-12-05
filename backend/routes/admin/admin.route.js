import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import Track from "../../model/Track.model.js";


const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

router.get("/dashboard", authMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
  });


  router.post(("/track/save"), (req, res) => {
    const { title, trackNo, description, date, time, sessionChair, supervisor, rapparteur, venue, facultyCoordinator } = req.body;
    // console.log(req.body); 
    if(!title || !trackNo || !description || !date || !time || !sessionChair || !supervisor || !rapparteur || !venue || !facultyCoordinator) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const newTrack = new Track({ title, trackNo, description, date, time, sessionChair, supervisor, rapparteur, venue, facultyCoordinator });
    newTrack.save();
    res.status(201).json({ message: "Track saved successfully" });
  });

  router.get("/track/getInfo", async (req, res) => {
    const { title } = req.query; // Access the title from query parameters
    // console.log(req.query); // Log query parameters for debugging
    try {
      const track = await Track.findOne({ title }); // Replace `trackNo` with `title` or the correct field
      res.json(track);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tracks" });
    }
  });
  
  export default router;
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import Track from "../../model/Track.model.js";
import { sendTrackAssignmentEmail, sendTrackCancelationEmail } from "../../lib/mail.js";
import EmailData from "../../model/EmailData.model.js";
import Session from "../../model/Session.model.js";


const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

router.get("/dashboard", authMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
  });


  router.post("/track/save", async (req, res) => {
    const {
      title,
      trackNo,
      description,
      date,
      time,
      sessionChair,
      supervisor,
      rapparteur,
      venue,
      facultyCoordinator,
      meetingLink
    } = req.body;
  
    if (
      !title ||
      !trackNo ||
      !description ||
      !date ||
      !time ||
      !sessionChair ||
      !supervisor ||
      !rapparteur ||
      !venue ||
      !facultyCoordinator ||
      !meetingLink
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
  
    try {
      // Find the track and update or insert it
      const updatedTrack = await Track.findOneAndUpdate(
        { trackNo }, // Find the track by trackNo
        {
          title,
          description,
          date,
          time,
          sessionChair,
          supervisor,
          rapparteur,
          venue,
          facultyCoordinator,
          meetingLink
        },
        { new: true, upsert: true } // Update if found, insert if not
      );
  
      if (updatedTrack) {
        try {
          // Check if the sessionChair already exists for the track
          const existingSessionChair = await Session.findOne({
            track: updatedTrack._id,
          });
  
          const faculty = await EmailData.findOne({ name: sessionChair });
          const sessionChairEmail = faculty.email;
  
          if (existingSessionChair) {
            // // Update the email and password for the existing session chair
            const password = supervisor
            .split(" ")
            .map((word) => word[0]) // Get the first letter of each word
            .join("")
            .toUpperCase(); // Optional: Convert to uppercase for consistency
            const rawPassword = `T${trackNo}${password}${Math.floor(Math.random() * 500)+100}`;
            const hashedPassword = await bcrypt.hash(rawPassword, 10);
            req.body["password"] = rawPassword;
            await sendTrackCancelationEmail(existingSessionChair.email,req.body);
            
            existingSessionChair.email = sessionChairEmail;
            existingSessionChair.password = hashedPassword;
  
            await existingSessionChair.save(); // Save the updated session chair
          } else {
            // If no existing session chair, create a new one
            const password = supervisor
            .split(" ")
            .map((word) => word[0]) // Get the first letter of each word
            .join("")
            .toUpperCase(); // Optional: Convert to uppercase for consistency
            const rawPassword = `T${trackNo}${password}${Math.floor(Math.random() * 500)+100}`;
            const hashedPassword = await bcrypt.hash(rawPassword, 10);
  
            const newSessionChair = new Session({
              email: sessionChairEmail,
              password: hashedPassword,
              track: updatedTrack._id,
            });
            req.body["password"] = rawPassword;
            await newSessionChair.save(); // Save the new session chair
            
          }
          
          await sendTrackAssignmentEmail(sessionChairEmail, req.body);
          return res.status(200).json({
            message: "Track assigned and email sent successfully!",
            track: updatedTrack,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Error sending email." });
        }
      } else {
        return res.status(500).json({ message: "Unable to save the track" });
      }
    } catch (error) {
      console.error("Error updating or saving track:", error);
      return res.status(500).json({ message: "Server error occurred" });
    }
  });
  

  router.get("/track/getInfo", async (req, res) => {
    const { title } = req.query; // Access the title from query parameters
    // console.log(req.query); // Log query parameters for debugging
    try {
      const track = await Track.findOne({ title }); 
      res.json({track});
    } catch (error) {
      res.status(500).json({ message: "Error fetching tracks" });
    }
  });

  router.get("/faculty/getInfo", async (req, res) => {
    try {
      // Fetch existing session chairs, rapporteurs, faculty coordinators, and supervisors from the track details
      const trackDetails = await Track.find();
  
      // Fetch all faculty members and session chairs
      const faculty = await EmailData.find(); // Assuming this returns the faculty data
      const sessionChairEmails = trackDetails.map(track => track.sessionChair);
      const supervisorEmails = trackDetails.map(track => track.supervisor);
  
      // Combine all emails of faculty assigned to roles (session chair, rapporteur, faculty coordinator, supervisor)
      const assignedFacultyEmails = [
        ...sessionChairEmails,
        ...supervisorEmails,
      ];
  
      // Filter out faculty members whose name is in the assigned faculty list
      const filteredFaculty = faculty.filter(member => 
        !assignedFacultyEmails.includes(member.name)
      );
      
      const internalFaculty = filteredFaculty.filter(member =>
        member.type === "internal"
      );

      const externalFaculty = filteredFaculty.filter(member =>
        member.type === "external"
      );

      const facultyCoordinator = filteredFaculty.filter(member =>
        member.type === "coordinator"
      );

      const student = filteredFaculty.filter(member =>
        member.type === "student"
      );
   
      res.json({ internalFaculty,  externalFaculty, facultyCoordinator, student });
    } catch (error) {
      res.status(500).json({ message: "Error fetching faculty" });
    }
  });
  
  
  export default router;

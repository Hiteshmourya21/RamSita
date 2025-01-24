import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../model/Admin.model.js";
import Session from "../../model/Session.model.js";
import Author from "../../model/Author.model.js";
import Track from "../../model/Track.model.js";
import { sendAuthurMail } from "../../lib/mail.js";

const router = express.Router();

// Environment variables
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// Admin Signup
router.post("/signup/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully." });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already exists." });
    } else {
      res.status(500).json({ message: "Error registering admin." });
    }
  }
});

// Session Chair Signup
router.post("/signup/session", async (req, res) => {
  const { email, password, track } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sessionChair = new Session({ email, password: hashedPassword, track });
    await sessionChair.save();

    res.status(201).json({ message: "Session Chair registered successfully." });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "Email already exists." });
    } else {
      res.status(500).json({ message: "Error registering session chair." });
    }
  }
});

// Author Signup
router.post("/signup/author", async (req, res) => {
  const { email, pid, title, members, trackno, isOnline } = req.body;

  // console.log(req.body);
  try {
    // Check if the track exists
    const findTrack = await Track.findOne({ trackNo: trackno });
    if (!findTrack) {
      return res.status(404).json({ message: "Track not found." });
    }

    // Generate a password from pid and first letters of each word in the title
    const titleInitials = title
      .split(" ")
      .map((word) => word[0]) // Get the first letter of each word
      .join("")
      .toUpperCase(); // Optional: Convert to uppercase for consistency
    const rawPassword = `${pid}${titleInitials}${Math.floor(Math.random() * 500) + 100}`;

    // Hash the generated password
    const hashedPassword = await bcrypt.hash(rawPassword, 10);



  
    const author = new Author({
        title,
        email,
        password: hashedPassword,
        members: members.map((member) => ({
          name: member,
        })),
        pid,
        track: findTrack._id,
        isOnline,
      });
   
    // Save the author to the database
    await author.save();

    // Send email to the author with the generated password
    try {
      const authorDetail = {
        title,
        pid,
        email,
        password: rawPassword,
        track: findTrack,
        isOnline,
        trackno: trackno,
      };
      await sendAuthurMail(email, authorDetail);
      res.status(201).json({
        message: "Author registered successfully and mail sent.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error sending email." });
    }
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).json({ message: "Error registering author." });
  }
});


// Login
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    try {
      let user;
      switch (role) {
        case "admin":
          user = await Admin.findOne({ email });
          break;
        case "sessionChair":
          user = await Session.findOne({ email });
          break;
        case "author":
           user = await Author.findOne({ pid:email });
          break;
        default:
          return res.status(400).json({ message: "Invalid role specified." });
      }
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Create token
      const token = jwt.sign(
        { id: user._id, role },
        SECRET_KEY,
        { expiresIn: "1d" }
      );
  
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error logging in." });
    }
  });
  

export default router;
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import Track from "../../model/Track.model.js";
import Author from "../../model/Author.model.js";


const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

// router.get("/dashboard", authMiddleware(["admin"]), (req, res) => {
//     res.json({ message: "Welcome to Admin Dashboard" });
//   });

router.get('/getDetail', async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  try {
    // Fetch the session chair based on the email
    const author = await Author.findOne({ email }); // Use `await` here

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Fetch the associated track
    const authorTrack = await Track.findOne({ _id: author.track }); // Assuming `track` is the correct field

    if (!authorTrack) {
      return res.status(404).json({ message: 'Track not found' });
    }

    // Send the track details as the response
    res.json(authorTrack);
  } catch (error) {
    console.error('Error fetching session or track:', error);
    res.status(500).json({ message: 'Error fetching session or track' });
  }
});

  router.get("/getAllAuthor", async (req, res) => {
    const { id } = req.query; 
    try {
        // console.log(id);
      const authors = await Author.find({ track : id }); 
    //   console.log(authors);
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching authors" });
    }
  });
  
  export default router;
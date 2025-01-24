import express from "express";
import EmailData from "../../model/EmailData.model.js";
import Track from "../../model/Track.model.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import Session from "../../model/Session.model.js";
import Author from "../../model/Author.model.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/track/getInfo", async (req, res) => {
  const { title } = req.query; 
  // console.log(req.query); // Log query parameters for debugging
  try {
    const track = await Track.findOne({ title }); // Replace `trackNo` with `title` or the correct field
    res.json(track);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tracks" });
  }
});
  
router.get('/getDetail', async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  try {
    // Fetch the session chair based on the email
    const sessionChair = await Session.findOne({ email }); // Use `await` here

    if (!sessionChair) {
      return res.status(404).json({ message: 'Session chair not found' });
    }

    // Fetch the associated track
    const track = await Track.findOne({ _id: sessionChair.track }); // Assuming `track` is the correct field

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    // Send the track details as the response
    res.json(track);
  } catch (error) {
    console.error('Error fetching session or track:', error);
    res.status(500).json({ message: 'Error fetching session or track' });
  }
});


// Route to update multiple authors
  router.put('/authors/bulk-update', async (req, res) => {
    try {
        const updates = req.body; // Array of updates

        if (!Array.isArray(updates)) {
            return res.status(400).json({ error: 'Request body must be an array of updates' });
        }

        // Validate and process each update
        const updatePromises = updates.map(async (update) => {
            const { _id, ...updateData } = update;

            // Validate the ID format
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new Error(`Invalid ID: ${_id}`);
            }

            // Update the author and return the result
            return Author.findByIdAndUpdate(
                _id,
                { $set: updateData },
                { new: true, runValidators: true }
            );
        });

        // Wait for all updates to complete
        const updatedAuthors = await Promise.all(updatePromises);

        res.status(200).json({ message: 'Authors Marks Updated successfully', data: updatedAuthors });
    } catch (error) {
        console.error('Error updating authors:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});


export default router;
import express from "express";
import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Track from "../../model/Track.model.js";
import Author from "../../model/Author.model.js";


const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";


// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "dfhrfqieg",
  api_key: "979325592118469",
  api_secret:"IDNHWt3mho9VYLsBLexK46pg8Do",
});

// Dynamic Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req, file) => {
    const { trackId, pid } = req.body; // Ensure `trackId` and `pid` are sent with the request

    return {
      folder: `conference/track_${trackId}`, // Organize by track folder
      public_id: pid, // Save file with `pid` as the name
      resource_type: 'auto', // Automatically detect file type
    };
  },
});

const upload = multer({ storage });

// File upload route
router.post('/uploadPresentation', upload.single('file'), async (req, res) => {
  try {
    const { trackId, pid } = req.body;
    const { path } = req.file; // Cloudinary file URL

    // Update the Author schema with the file path
    await Author.updateOne(
      { pid }, // Find author by `pid`
      { $set: { presentationPath: path } }
    );

    res.status(200).json({ message: 'File uploaded successfully!', path });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
});



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
    res.json({track:authorTrack,author:author});
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
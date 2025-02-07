import express from "express";
import Track from "../../model/Track.model.js";
import Author from "../../model/Author.model.js";


const router = express.Router();

router.post("/uploadPresentation", async (req, res) => {
  const { link, pid } = req.body;

  const author = await Author.findOne({ pid });

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  author.presentationPath = link;
  author.status = "submitted";
  await author.save();

  res.status(200).json({ message: "Presentation uploaded successfully" });
});



router.get('/getDetail', async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  try {
    // Fetch the session chair based on the email
    const author = await Author.findOne({ pid: email }); // Use `await` here

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
      for(const author of authors){
        author.scores.marks = author.scores.marks !==0 ? author.scores.marks :  author.scores.originality + author.scores.relevance + author.scores.quality + author.scores.clarity + author.scores.presentation;
      }
    //   console.log(authors);
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching authors" });
    }
  });
  
  export default router;

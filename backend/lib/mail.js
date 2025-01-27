import nodemailer from "nodemailer";

const whatsapp = {
  "2": "https://chat.whatsapp.com/CUOqAGoVTYKAUc0A4jNuGC",
  "1": "https://chat.whatsapp.com/JhhnaIOSir25qu3Yq4p7B6",
  "3": "https://chat.whatsapp.com/JauSFZo7rUmKTX4k3YUHnv",
  "4": "https://chat.whatsapp.com/LvmHvx7Hpx44j4ypP7Wd8q",
  "5": "https://chat.whatsapp.com/JU4YA61bZhM1quSlQ3YINJ",
  "6": "https://chat.whatsapp.com/HuMehuvIf4tG5Fz0fbn9hE",
  "7": "https://chat.whatsapp.com/KklKgO9qrsjLRmZS5Zwlz1",
  "8": "https://chat.whatsapp.com/KGfrNwioY5p4ytNnPjci4O",
  "9": "https://chat.whatsapp.com/HnC89HhafAb8ycDCfbyH0b",
  "10": "https://chat.whatsapp.com/E8wvj3SPRw1H6UkX4hkZFq"
}

export const sendTrackAssignmentEmail = async (sessionChairEmail, trackDetails) => {
  try {
    // Configure your email transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email provider (e.g., Gmail)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Construct the email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: sessionChairEmail, // Recipient email
      subject: "Session Assignment Notification",
      text: `Dear Session Chair,

You have been assigned to the following Session:

Session Number: ${trackDetails.trackNo}
Session Title: ${trackDetails.title}
Session Description ${trackDetails.description}
Assigned Date: ${new Date(trackDetails.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${trackDetails.time}
Venue: ${trackDetails.venue}
Password: ${trackDetails.password}

Please make sure to attend the session on the specified date and time.

You can login here : https://ramsita.onrender.com/


Best regards,
Conference Management Team
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Session assignment email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendAuthurMail = async (authorEmail, authorDetail) => {
    try {
      // Configure your email transport

      const whatsappLink = whatsapp[authorDetail.trackno];
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email provider (e.g., Gmail)
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });
  
      // Construct the email
      const mailOptions = {
        from:`"RAMSITA - 2025" <${process.env.EMAIL_USER}>` , // Sender email
        to: authorEmail, // Recipient email
        subject: "Call for presentation submission for your accepted paper in Springer Nature : International Conference on RAMSITA 2025 | Deadline : 27 January 2025 ",
        text: `
Dear Author,

You have been assigned to the following Session:

-------------------------------------------
Session Details:
-------------------------------------------
Session Number: ${authorDetail.track.trackNo}
Session Title: ${authorDetail.track.title}
Session Description: ${authorDetail.track.description}
Assigned Date: ${new Date(authorDetail.track.date).toLocaleDateString()}
Time: ${authorDetail.track.time}
Venue: ${authorDetail.track.venue}

-------------------------------------------
Paper Details:
-------------------------------------------
Paper ID: ${authorDetail.pid}
Paper Title: ${authorDetail.title}
Mode Of Presentation : ${authorDetail.isOnline ? "Online" : "Offline"}

Note: Please Check Your Mode of Presentation. For any enquery please join our "whatsapp" community : ${whatsappLink}.

-------------------------------------------
Login Credentials:
-------------------------------------------
Paper ID: ${authorDetail.pid}
Password: ${authorDetail.password}

-------------------------------------------
Important Instructions:
-------------------------------------------
Please make sure to attach the ppt and reply to this email with the following details:
- Paper Id
- Paper Name

1. Please confirm your attendance for the session.
2. Ensure that you are present at the specified venue on time.
3. These details are for confirmation purposes and are not to be shared publicly.
4. Make sure to bring an additional soft copy of your ppt with you.
5. Ensure to present ppt under your alloted time.
6. Ensure to submit your presentation on or before 27 January 2025
7. This mail is in continue to the previous mail
8. For any query, join our "whatsapp" community : ${whatsappLink}
 
-------------------------------------------

You can login here : https://ramsita.onrender.com/



We look forward to your active participation in the session.

Best regards,
Conference Management Team
  `,
};
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("Track assignment email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  export const sendTrackCancelationEmail = async (sessionChairEmail,trackDetails) => {
    try {
      // Configure your email transport
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use your email provider (e.g., Gmail)
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });
  
      // Construct the email
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email
        to: sessionChairEmail, // Recipient email
        subject: "Session Cancelation Notification",
        text: `Dear Session Chair,
  
  Pardon!! 
  This is to inform you that your track has been rescheduled to another incharge.
  Your previous track details are:
  
  Session Number: ${trackDetails.trackNo}
  Session Title: ${trackDetails.title}
  Session Description ${trackDetails.description}
  Assigned Date: ${new Date(trackDetails.date).toLocaleDateString()}
  Time: ${trackDetails.time}
  Venue: ${trackDetails.venue}
  
  Please wait until further notice or any updates.
  
  
  Best regards,
  Conference Management Team
        `,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log("Session assignment email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };
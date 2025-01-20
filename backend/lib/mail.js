import nodemailer from "nodemailer";

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
      subject: "Track Assignment Notification",
      text: `Dear Session Chair,

You have been assigned to the following track:

Track Number: ${trackDetails.trackNo}
Track Title: ${trackDetails.title}
Track Description ${trackDetails.description}
Assigned Date: ${new Date(trackDetails.date).toLocaleDateString()}
Time: ${trackDetails.time}
Venue: ${trackDetails.venue}
Password: ${trackDetails.password}

Please make sure to attend the session on the specified date and time.

You can login here : https://ramsitaconference.onrender.com/


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

export const sendAuthurMail = async (authorEmail, authorDetail) => {
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
        to: authorEmail, // Recipient email
        subject: "Track Assignment Notification",
        text: `
Dear Author,

You have been assigned to the following track:

-------------------------------------------
Track Details:
-------------------------------------------
Track Number: ${authorDetail.track.trackNo}
Track Title: ${authorDetail.track.title}
Track Description: ${authorDetail.track.description}
Assigned Date: ${new Date(authorDetail.track.date).toLocaleDateString()}
Time: ${authorDetail.track.time}
Venue: ${authorDetail.track.venue}

-------------------------------------------
Paper Details:
-------------------------------------------
Paper ID: ${authorDetail.pid}
Paper Title: ${authorDetail.title}

-------------------------------------------
Login Credentials:
-------------------------------------------
Email: ${authorDetail.email}
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

-------------------------------------------

You can login here : https://ramsitaconference.onrender.com/

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
        subject: "Track Cancelation Notification",
        text: `Dear Session Chair,
  
  Pardon!! 
  This is to inform you that your track has been rescheduled to another incharge.
  Your previous track details are:
  
  Track Number: ${trackDetails.trackNo}
  Track Title: ${trackDetails.title}
  Track Description ${trackDetails.description}
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
      console.log("Track assignment email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";

const AddPresentationPage = () => {
  const location = useLocation();
  const state = location.state;

  const [link, setLink] = useState(state.presentation || "");

  const handleUpload = async () => {
    if (link.trim() === "") {
      toast.error("Please enter a valid link");
      return;
    }

    try {
      const response = await axiosInstance.post(`/author/uploadPresentation`, {
        link,
        pid: state.pid,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1
        style={{
          textAlign: "center",
          color: "#9c27b0",
          fontFamily: "Arial",
          fontSize: "2rem",
          marginBottom: "50px",
        }}
      >
        Upload Presentation
      </h1>

      {/* Instruction Section */}
      <div
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #9c27b0",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          maxWidth: "600px",
          justifySelf: "center",
        }}
      >
        <h1
          style={{
            color: "#9c27b0",
            fontSize: "1.5rem",
            marginBottom: "15px",
          }}
        >
          Instructions
        </h1>
        <ol style={{ fontSize: "1rem", color: "#333" ,textAlign: "left"}}>
          <li>Save or rename your presentation file as <strong>paper id_paper name</strong>.</li>
          <li>Open Google Drive with your authorized email.</li>
          <li>Create a folder and rename it as <strong>Session Number and Paper id</strong>.</li>
          <li>Open the folder and upload your presentation here.</li>
          <li>
            Change the access of the folder to <strong>anyone with the link</strong>.
          </li>
          <li>Copy the link and paste it here. Then submit.</li>
        </ol>
        <p style={{ color: "#555", marginTop: "10px", fontStyle: "italic",textAlign: "left" }}>
          <strong>Note:</strong> Make sure to follow the instructions carefully.
        </p>
      </div>

      {/* Input Section */}
      <div style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Enter Drive Link Here...."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #9c27b0",
            maxWidth: "500px",
          }}
        />
        <button
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={handleUpload}
        >
          Upload Drive Link
        </button>
      </div>

      {/* Video Tutorial Section */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <h3
            style={{
              color: "#9c27b0",
              fontFamily: "Arial",
              fontSize: "1.5rem",
              marginBottom: "10px",
            }}
          >
            Watch the Tutorial
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <video
            width="100%"
            height="auto"
            controls
            style={{
              maxWidth: "700px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <source src="/instruction.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddPresentationPage;

import React, { useState } from "react";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const AddPresentationPage = () => {
  const [file, setFile] = useState(null);
  const location = useLocation();
  const state = location.state;
  // console.log(state);
  const [message, setMessage] = useState("");
  const trackId = location?.state?.trackId;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file!');
      return;
    }
  
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('pid', state.pid);  // Ensure email is correctly appended
  //   formData.append('trackId', trackId);
    
  // for (let [key, value] of formData.entries()) {
  //   console.log(key, value);  // Log formData contents
  // }
  const formData = {
    file: file,
    pid: state.pid,
    trackId: trackId,
  }
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/author/uploadPresentation`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('File uploaded successfully!');
      console.log('Uploaded file path:', response.data.path);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please try again.');
    }
  };
  
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Upload Presentation</h2>
      <input type="file" onChange={handleFileChange} />
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
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPresentationPage;

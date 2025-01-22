import React, { useState } from "react";

import {  useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";

const AddPresentationPage = () => {
  const location = useLocation();
  const state = location.state;
  // console.log(state);

  const presentation = state.presentation;
  const [link, setLink] = useState(state.presentation||"");



  const handleUpload = async () => {
    if(link.trim() === ""){
      toast.error("Please enter a valid link");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/author/uploadPresentation`,
        { link, pid: state.pid }
      );
      toast.success(response.data.message);
  
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Error uploading file");
    }
  };
  
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div>

      <h1 style={{
        textAlign: "center",
        color: "#9c27b0",
        fontFamily: "Arial",
        fontSize: "2rem",
        marginBottom: "50px",
      }}>Upload Presentation</h1>

      
      <input type="text"   placeholder="Enter Drive Link Here...." value={link} onChange={(e) => setLink(e.target.value)}
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
      
      <ToastContainer />
    </div>
  );
};

export default AddPresentationPage;

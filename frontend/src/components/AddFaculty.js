import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../lib/axios";

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading notification
    const loadingToastId = toast.loading("Adding faculty, please wait...");

    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/register/faculty`,
        formData
      );

      // Update the loading notification to success
      toast.update(loadingToastId, {
        render: response.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Reset form fields
      setFormData({ name: "", email: "", type: "" });
    } catch (error) {
      // Update the loading notification to error
      if (error.response && error.response.status === 400) {
        toast.update(loadingToastId, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(loadingToastId, {
          render: "An error occurred while adding faculty.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
      console.error("Error in adding faculty:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton}>
          <Link to="/admin/dashboard">
            <strong style={styles.strongText}>←</strong>
          </Link>
        </button>
        RAMSITA CONFERENCE
      </div>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="title">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email">Email ID:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email ID"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="type">Type of Faculty:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              style={styles.input}
            >
              <option value="">Select Faculty Type</option>
              <option value="internal">Internal Session Chair</option>
              <option value="external">External Session Chair</option>
              <option value="coordinator">Faculty Coordinator</option>
              <option value="student">Student</option>
            </select>
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      <footer style={styles.footer}>
        copyright@CSIT Acropolis
      </footer>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0",
    padding: "20px",
    backgroundColor: "#8ef5e7",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#4d365f",
    color: "white",
    textAlign: "center",
    padding: "15px",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 auto",
    borderRadius: "5px",
  },
  backButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "25px",
    cursor: "pointer",
    position: "absolute",
    top: "32px",
    left: "25px",
  },
  strongText: {
    fontSize: "24px",
    color: "#ffffff",
  },
  formContainer: {
    backgroundColor: "#f6e47b",
    borderRadius: "10px",
    padding: "20px",
    maxWidth: "450px",
    margin: "20px auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "95%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  addAuthorButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  submitButton: {
    backgroundColor: "#3D52A0",
    color: "white",
    width: "100%",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default AddFaculty;

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const { name, email } = formData;
    try{
      const response = await axios.post('http://localhost:5000/register/faculty',formData);
      console.log(response.data);
      setFormData({ name: "", email: ""});
    //   navigate('/admin/TrackDetail',{ state: state });
    }
    catch(error){
      if(error.response.status === 400){
        alert(error.response.data.message);
      }
      console.log("Error in adding author",error);
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
        RAMSITA CONFERENCE</div>
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

          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      <footer style={styles.footer}>
        copyright@CSIT Acropolis
      </footer>
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

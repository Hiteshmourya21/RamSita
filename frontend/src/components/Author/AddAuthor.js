import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import { toast, ToastContainer } from 'react-toastify';

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    paperId: "",
    title: "",
    email: "",
    authors: [""],
    isOnline: false,
  });
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      isOnline: !prevData.isOnline,
    }));
  };

  const handleAuthorChange = (index, value) => {
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      authors: updatedAuthors,
    }));
  };

  const addAuthorField = () => {
    setFormData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { paperId, title, email, authors, isOnline } = formData;
  
    if (!paperId || !title || !email || !authors ) {
      toast.error("Please fill in all fields", { position: "top-right" });
      return;
    }

    const confirmSubmission = window.confirm(`Are you sure you want to submit the author's details?\nAuthor Detail : \n Paper ID: ${paperId}\nTitle: ${title}\nEmail: ${email}\nAuthors: ${authors.join(", ")}\nIs Online: ${isOnline}`);
    if (!confirmSubmission) {
      return;
    }
  
    const dataToSubmit = {
      pid: paperId,
      title,
      email,
      members: authors,
      trackno: state.id,
      isOnline,
    };
  
    const loadingToastId = toast.loading("Saving author, please wait...", { position: "top-right" });
  
    try {
      const response = await axiosInstance.post(`/auth/signup/author`, dataToSubmit);
      console.log(response.data);
      setFormData({
        paperId: "",
        title: "",
        email: "",
        authors: [""],
        isOnline: false,
      });
      toast.update(loadingToastId, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
      resetStates();
    } catch (error) {
      console.error(error);
      toast.update(loadingToastId, { render: "Error saving author. Please try again!", type: "error", isLoading: false, autoClose: 3000 });
    }
  };
  

  const resetStates = () =>{
    setFormData(
      {
        paperId: "",
        title: "",
        email: "",
        authors: [""],
        isOnline: false,
      }
    )
  }

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
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
            <label htmlFor="paperId">Paper ID:</label>
            <input
              type="number"
              id="paperId"
              name="paperId"
              placeholder="Enter Paper ID"
              value={formData.paperId}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
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
            <label>Author(s):</label>
            {formData.authors.map((author, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  name={`author-${index}`}
                  placeholder="Enter Author Name"
                  value={author}
                  onChange={(e) => handleAuthorChange(index, e.target.value)}
                  required
                  style={{ ...styles.input, flex: 1 }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAuthorField}
              style={styles.addAuthorButton}
            >
              + Add Author
            </button>
          </div>

          <div style={styles.formGroup}>
            <input
              type="checkbox"
              id="isOnline"
              checked={formData.isOnline}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="isOnline">Online</label>
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

export default AddAuthor;

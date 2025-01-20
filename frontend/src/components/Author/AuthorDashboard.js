import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const AuthorDashboard = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [showAuthorDetails, setShowAuthorDetails] = useState(false);
  const [track, setTrack] = React.useState({
    "title": "",
    "description": "",
    "date": "",
    "time": "",
    "supervisor": "",
    "rapparteur": "",
    "venue": "",
    "facultyCoordinator": ""
});
  const [authorsData, setAuthorsData] = React.useState([]);
  const [author, setAuthor] = React.useState([]);

  useEffect(() => {
    const fetchUser = async () => {
        try {
            const trackResponse = await axiosInstance.get(
              `${process.env.REACT_APP_BASE_URL}/author/getDetail`,
              { params: { email: state } }
            );
            // console.log(trackResponse.data);
            if (trackResponse.data) {
              setTrack(trackResponse.data.track);
              setAuthor(trackResponse.data.author);
              const authorsResponse = await axiosInstance.get(
                `${process.env.REACT_APP_BASE_URL}/author/getAllAuthor`,
                { params: { id: trackResponse.data.track._id } }
              );
              console.log(authorsResponse.data);
              setAuthorsData(authorsResponse.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
    };
    fetchUser();
    }, []);
  
    const handleAddPresentation = () => {
      navigate('/add-presentation', { state: { trackId: track._id , pid:author.pid } });
    };

  if(authorsData.length === 0){
    return <div>Loading...</div>;
  }
  const toggleAuthorDetails = () => {
    setShowAuthorDetails(!showAuthorDetails);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{track.title}</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          backgroundColor: "white",
          borderRadius: "8px",
          maxWidth: "800px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan="2"
              style={{
                padding: "15px",
                backgroundColor: "#9c27b0",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              {track.description}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
                fontWeight: "bold",
              }}
            >
              <span>Date: {track.date.split("T")[0]}</span>
            </td>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
                fontWeight: "bold",
              }}
            >
              <span>Time: {track.time}</span>
            </td>      
          </tr>
          <tr>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
                fontWeight: "bold",
              }}
            >
              Venue
            </td>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              {track.venue}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
                fontWeight: "bold",
              }}
            >
              Supervisors
            </td>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              {track.supervisor}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
                fontWeight: "bold",
              }}
            >
              Rapporteur
            </td>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              {track.rapparteur}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
                fontWeight: "bold",
              }}
            >
              Faculty Coordinator
            </td>
            <td
              style={{
                padding: "10px 15px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              {track.facultyCoordinator}
            </td>
          </tr>
        </tbody>
      </table>

      <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        marginBottom: "75px",
        textAlign: "left",
        backgroundColor: "white",
        maxWidth: "800px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#9c27b0", color: "white" }}>
          <th style={{ padding: "10px" }}>Paper ID</th>
          <th style={{ padding: "10px" }}>Paper Title</th>
          <th style={{ padding: "10px" }}>Author Name</th>
        </tr>
      </thead>
      <tbody>
        {authorsData.map((author, index) => (
          <React.Fragment key={index}>
            <tr>
              <td
                rowSpan={author.members.length}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {author.pid}
              </td>
              <td
                rowSpan={author.members.length}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {author.title}
              </td>
              <td
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {author.members[0].name}
              </td>
            
            </tr>
            {author.members.slice(1).map((member, idx) => (
              <tr key={idx}>
                <td
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  {member.name}
                </td>
                  </tr>
                ))}
              </React.Fragment>
        ))}
      </tbody>
    </table>


      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "10px 20px",
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "#9c27b0",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={handleAddPresentation}
        >
          Add Presentation
        </button>
      </footer>
    </div>
  );
};

export default AuthorDashboard;

import React, { useEffect } from "react";
import "./SessionDashboard.css";
import { Link, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";

const SessionDashboard = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const [track, setTrack] = React.useState({
    "title": "",
    "description": "",
    "date": "",
    "time": "",
    "sessionChair": "",
    "supervisor": "",
    "rapparteur": "",
    "venue": "",
    "facultyCoordinator": ""
});
  const [authorsData, setAuthorsData] = React.useState([]);


  useEffect(() => {
    const fetchUser = async () => {
        try {
            const trackResponse = await axiosInstance.get(
              `/session/getDetail`,
              { params: { email: state } }
            );
            // console.log(trackResponse.data);
            if (trackResponse.data) {
              setTrack(trackResponse.data);
    
              const authorsResponse = await axiosInstance.get(
                `/author/getAllAuthor`,
                { params: { id: trackResponse.data._id } }
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




  const handleSubmitEvent = async() => {
    const loadingToastId = toast.loading("Submitting authors data, please wait...", { position: "top-right" });

    try {
        const response = await axiosInstance.put(`/session/authors/bulk-update`, authorsData);
        toast.update(loadingToastId, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
        
      } catch (error) {
        console.log(error);
        toast.update(loadingToastId, { render: "Error submitting. Please try again!", type: "error", isLoading: false, autoClose: 3000 });
      }
  };


  const addTime = (timeString, hoursToAdd, minutesToAdd) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + hoursToAdd * 60 + minutesToAdd;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
<div>
      {/* Container for Venue Details */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="container">
        <header>
          <h1>RAMSITA-2025</h1>
          <button style={{"float":"right"}} onClick={handleLogout}>LogOut</button>
        </header>
        <table>
          <tr>
            <th>
              Venue :-
              <span> {track.venue}</span>
            </th>
            <td>
              <th>
                Date:-
                <span >
                    {track.date.split("T")[0]}
                  {/* {new Date(track.date).toISOString().split("T")[0]} */}
                </span>
              </th>
            </td>
            <td>
              <th>
                Start Time:-
                <span style={{"fontWeight":"normal"}}>{track.time} </span>
              </th>
            </td>
              <td>
                <th>
                End Time:-
                <span style={{"fontWeight":"normal"}}>{addTime(track.time, 1, 50)} </span>
                </th>
              </td>
          </tr>
        </table>
        <table>
          
          <tr>
          <td>{track.title}</td>
          <td>{track.description}</td>
          </tr>
          <tr>
                <td>Internal Session Chair</td>
                <td>
                  <p>{track.supervisor}</p>
                </td>
              </tr>
          <tr>
                <td>External Session Chair</td>
                <td>
                <p>{track.sessionChair}</p>
                </td>
              </tr>
          <tr>
                <td>Rapporteur</td>
                <td>
                <p>{track.rapparteur}</p>
                </td>
              </tr>
          <tr>
                <td>Faculty Coordinator</td>
                <td>
                <p>{track.facultyCoordinator}</p>
                </td>
              </tr>
        </table>
        
      </div>

      {/* Container for Presentation Paper */}
      <div className="container">
        <header>
          <h1>
            RAMSITA - 2025
            <br />
            Presentation Paper
          </h1>
        </header>
        <table>
          <thead>
            <tr>
              <th>CH ID</th>
              <th>Team Name</th>
              <th>Team Member</th>
              <th>Present</th>
              <th>Originality</th>
              <th>Report Creation</th>
              <th>Timely Submission</th>
              <th>Presentation</th>
              <th>Marks</th>
              <th>Status</th>
              <th>Presenter</th>
              <th>Mode</th>
            </tr>
          </thead>
          <tbody>
          {authorsData.map((author, index) => (
            <React.Fragment key={index}>
              <tr>
                <td rowSpan={author.members.length}>{author.pid}</td>
                <td rowSpan={author.members.length}>{author.title}</td>
                <td>{author.members[0].name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={author.members[0].attendance}
                    onChange={(e) => {
                      const updatedAttendance = [...authorsData];
                      updatedAttendance[index].members[0].attendance = e.target.checked;
                      // console.log(updatedAttendance);
                      setAuthorsData(updatedAttendance);
                    }}
                  />
                </td>
                <td rowSpan={author.members.length}>
                  <input
                    type="number"
                    value={author.scores.originality}
                    min="0"
                    max="10"
                    onChange={(e) => {
                      if(e.target.value>10){
                        e.target.value=10;
                      }
                      const updatedMarks = [...authorsData];
                      updatedMarks[index].scores.originality = e.target.value;
                      // console.log(updatedMarks);
                      setAuthorsData(updatedMarks);
                    }}
                  />
                </td>
                <td rowSpan={author.members.length}>
                  <input
                    type="number"
                    value={author.scores.relevance}
                    min="0"
                    max="10"
                    onChange={(e) => {
                      if(e.target.value>10){
                        e.target.value=10;
                      }
                      const updatedMarks = [...authorsData];
                      updatedMarks[index].scores.relevance = e.target.value;
                      // console.log(updatedMarks);
                      setAuthorsData(updatedMarks);
                    }}
                  />
                </td>
                <td rowSpan={author.members.length}>
                  <input
                    type="number"
                    value={author.scores.quality}
                    min="0"
                    max="10"
                    onChange={(e) => {
                      if(e.target.value>10){
                        e.target.value=10;
                      }
                      const updatedMarks = [...authorsData];
                      updatedMarks[index].scores.quality = e.target.value;
                      // console.log(updatedMarks);
                      setAuthorsData(updatedMarks);
                    }}
                  />
                </td>
                <td rowSpan={author.members.length}>
                  <input
                    type="number"
                    value={author.scores.presentation}
                    min="0"
                    max="10"
                    onChange={(e) => {
                      if(e.target.value>10){
                        e.target.value=10;
                      }
                      const updatedMarks = [...authorsData];
                      updatedMarks[index].scores.presentation = e.target.value;
                      // console.log(updatedMarks);
                      setAuthorsData(updatedMarks);
                      
                    }}
                  />
                </td>
                <td rowSpan={author.members.length}>
                  <input
                    type="number"
                  
                    value={parseInt(author.scores.originality) + parseInt(author.scores.relevance) + parseInt(author.scores.quality) + parseInt(author.scores.clarity) + parseInt(author.scores.presentation)}
                    onChange={(e) => {
                      const updatedMarks = [...authorsData];
                      updatedMarks[index].scores.marks = e.target.value;
                      // console.log(updatedMarks);
                      setAuthorsData(updatedMarks);
                    }}
                    disabled
                    style={{"width": "50px"}}
                  />
                </td>
                <td rowSpan={author.members.length}>
                <a 
                      href={author.presentationPath}
                      className="submit-btn"
                      style={{
                        backgroundColor: author.status === "pending" ? "red" : "#4CAF50",
                        textDecoration: "none",
                        color: "white",
                        padding: "5px 10px",
                      }}
                      target="_blank"
                    >
                      {author.status}
                    </a>
                </td>
                <td rowSpan={author.members.length}>
                  <select
                    onChange={(e) => {
                      const updatedAuthors = [...authorsData];
                      updatedAuthors[index].presenter = e.target.value;
                      setAuthorsData(updatedAuthors);
                    }}
                    value={author.presenter || ""}
                  >
                    <option value="" disabled>
                      Select Presenter
                    </option>
                    {author.members.map((member) => (
                      <option key={member.name} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td rowSpan={author.members.length}>
                    <select value={author.isOnline} style={{color : author.isOnline ? "green" : "red", fontSize : "16px"}}>
                      <option value="false">Offline</option>
                      <option value="true">Online</option>
                    </select>
                </td>

              </tr>
              {author.members.slice(1).map((member, idx) => (
                <tr key={idx}>
                  <td>{member.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={member.attendance}
                      onChange={(e) => {
                        const updatedAttendance = [...authorsData];
                        updatedAttendance[index].members[idx + 1].attendance =
                          e.target.checked;
                        setAuthorsData(updatedAttendance);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>

        </table>
        <button className="submit-btn" onClick={handleSubmitEvent}>Submit</button>
      </div>
      <footer className="footer">
        copyright@CSIT Acropolis
      </footer>
    </div>
  );
};

export default SessionDashboard;

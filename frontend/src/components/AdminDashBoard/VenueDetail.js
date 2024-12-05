import React, { useEffect } from "react";
import "./VenueDetail.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const VenueDetail = () => {
  const [track, setTrack] = React.useState([]);
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    const fetchData = async () => {
      // console.log(state.title)
      const response = await axios.get("http://localhost:5000/api/v1/admin/track/getInfo", { params: { title: state.title } });
      if(!response.data) {
        setTrack({});
      }
      else{
        console.log(response.data);
        setTrack(response.data);
      }
    };
    fetchData();
  }, []);



  const [venue, setVenue] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [sessionChair, setSessionChair] = React.useState("");
  const [supervisor, setSupervisor] = React.useState("");
  const [facultyCoordinator, setFacultyCoordinator] = React.useState("");
  const [rapparteur, setRapparteur] = React.useState("");
  


  const handleBackButtonClick = () => {
    alert("Go back to the previous page!");
  };

  const handleSubmitClick = async(e) => {
    e.preventDefault();
    const data = {
      title : state.title,
      trackNo : state.id.toString(),
      description: state.description,
      date, 
      time, 
      sessionChair, 
      supervisor, 
      rapparteur, 
      venue, 
      facultyCoordinator 
    }
    try {
      const response = await axios.post("http://localhost:5000/api/v1/admin/track/save", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  const handleEmailClick = (authorIndex) => {
    alert(`Email button clicked for Author ${authorIndex + 1}`);
  };

  return (
    <div>
      {/* Container for Venue Details */}
      <div className="container">
        <header>
          <button className="back-button" onClick={handleBackButtonClick}>
            <Link to="/admin/dashboard">
              <strong>←</strong>
            </Link>
          </button>
          <h1>RAMSITA-2025</h1>
        </header>
        <table>
          <tr>
            <th>
              Venue :-
              <select value={track.venue ? track.venue : venue } id="VenueRoom" onChange={(e) => setVenue(e.target.value)}>
                <option value=""></option>
                <option value="L341">L341 3rd block 3</option>
                <option value="L342">L342 3rd block 3</option>
                <option value="L343">L343 3rd block 3</option>
                <option value="L340">L340 3rd block 3</option>
              </select>
            </th>
            <td>
              <th>
                Date:-
                <input id="appointment-time" type="date" name="appointment-time" value={track.data ? new Date( track.data) : date} onChange={(e) => setDate(e.target.value)}/>
              </th>
            </td>
            <td>
              <th>
                Time:-
                <input id="appointment-time" type="time" name="appointment-time" value={track.time ? track.time : time} onChange={(e) => setTime(e.target.value)}/>
              </th>
            </td>
          </tr>
        </table>
        <table>
          
          <tr>
          <td>{state.title}</td>
          <td>{state.description}</td>
          </tr>
          <tr>
                <td>Supervisors</td>
                <td>
                  <select value={track.supervisor ? track.supervisor : supervisor} id="supervisor" onChange={(e) => setSupervisor(e.target.value)}>
                  <option value=""></option>
                    <option value="Dr. Vandana Kate">Dr. Vandana Kate</option>
                    <option value="Prof. Chanchal Bansal">Prof. Chanchal Bansal</option>
                    <option value="Prof. Manoj Kumar Gupta">Prof. Manoj Kumar Gupta</option>
                    <option value="Prof. Aashish Anjana">Prof. Aashish Anjana</option>
                  </select>
                </td>
              </tr>
          <tr>
                <td>Session Chair</td>
                <td>
                  <select value={track.sessionChair ? track.sessionChair : sessionChair} id="sessionChair" onChange={(e) => setSessionChair(e.target.value)}>
                  <option value=""></option>
                  <option value="Dr. Vandana Kate">Dr. Vandana Kate</option>
                <option value="Prof. Chanchal Bansal">Prof. Chanchal Bansal</option>
                <option value="Prof. Manoj Kumar Gupta">Prof. Manoj Kumar Gupta</option>
              <option value="Prof. Aashish Anjana">Prof. Aashish Anjana</option>
                  </select>
                </td>
              </tr>
          <tr>
                <td>Rapporteur</td>
                <td>
                  <select value={track.rapparteur ? track.rapparteur : rapparteur} id="rapparteur" onChange={(e) => setRapparteur(e.target.value)}>
                  <option value=""></option>
                  <option value="Dr. Vandana Kate">Dr. Vandana Kate</option>
                <option value="Prof. Chanchal Bansal">Prof. Chanchal Bansal</option>
                <option value="Prof. Manoj Kumar Gupta">Prof. Manoj Kumar Gupta</option>
              <option value="Prof. Aashish Anjana">Prof. Aashish Anjana</option>
                  </select>
                </td>
              </tr>
          <tr>
                <td>Faculty Coordinator</td>
                <td>
                  <select value={track.facultyCoordinator ? track.facultyCoordinator : facultyCoordinator} id="facultyCoordinator" onChange={(e) => setFacultyCoordinator(e.target.value)}>
                  <option value=""></option>
                  <option value="Dr. Vandana Kate">Dr. Vandana Kate</option>
                <option value="Prof. Chanchal Bansal">Prof. Chanchal Bansal</option>
                <option value="Prof. Manoj Kumar Gupta">Prof. Manoj Kumar Gupta</option>
              <option value="Prof. Aashish Anjana">Prof. Aashish Anjana</option>
                  </select>
                </td>
              </tr>
        </table>
          <input type="submit" value="Submit" onClick={handleSubmitClick} />
      </div>

      {/* Container for Presentation Paper */}
      <div className="container">
        <header>
          <button className="back-button" onClick={handleBackButtonClick}>
            <a href="http://127.0.0.1:5500/Admin.html">
              <strong>←</strong>
            </a>
          </button>
          <h1>
            RAMSITA - 2025
            <br />
            Presentation Paper
          </h1>
        </header>
        <table>
          <thead>
            <tr>
              <th>Paper ID</th>
              <th>Paper Title</th>
              <th>Author Name</th>
              <th>Present</th>
              <th>Marks</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Paper Data */}
            {[
              {
                id: 219,
                title: "Carbon Compass: Real-Time Tracking And Solutions For a Sustainable Future",
                authors: ["Aarushi Chouhan", "Akshat Tiwari", "Arun Patidar", "Chirag Tiwari"],
                status: "Submit",
              },
              {
                id: 228,
                title:
                  "Empowering Connections: A Matrimonial Solution For The Down Syndrome Community",
                authors: [
                  "Archana Singh",
                  "Ayana Lala",
                  "Bhumika Tekam",
                  "Jyoti Bhowmick",
                  "Dr. Shilpa Bhalerao",
                  "Prof. Vandana Kate",
                ],
                status: "Pending",
              },
            ].map((paper, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan={paper.authors.length}>{paper.id}</td>
                  <td rowSpan={paper.authors.length}>{paper.title}</td>
                  <td>{paper.authors[0]}</td>
                  <td rowSpan={paper.authors.length}></td>
                  <td rowSpan={paper.authors.length}></td>
                  <td rowSpan={paper.authors.length}>
                    <button
                      className="submit-btn"
                      style={{
                        backgroundColor: paper.status === "Pending" ? "red" : "#4CAF50",
                      }}
                    >
                      {paper.status}
                    </button>
                  </td>
                </tr>
                {paper.authors.slice(1).map((author, idx) => (
                  <tr key={idx}>
                    <td>{author}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <button className="add-work add-Paper">
          <span>+ Add work</span>
        </button>
      </div>

      {/* Container for Authors */}
      <div className="container">
        <header>
          <button className="back-button" onClick={handleBackButtonClick}>
            <a href="http://127.0.0.1:5500/Admin.html">
              <strong>←</strong>
            </a>
          </button>
        </header>
        <h1 className="title">Authors</h1>
        <div className="author-list">
          {[
            { name: "Arun Patidar", color: "#FF5722" },
            { name: "Akshat Tiwari", color: "#2196F3" },
            { name: "Archana Singh", color: "#4CAF50" },
            { name: "Aarushi Chouhan", color: "#FFEB3B" },
            { name: "Jyoti Bhowmick", color: "#9C27B0" },
          ].map((author, index) => (
            <div className="author-item" key={index}>
              <div className="author-icon" style={{ backgroundColor: author.color }}>
                {author.name[0]}
              </div>
              <span className="author-name">{author.name}</span>
              <button
                className="email-button"
                onClick={() => handleEmailClick(index)}
              >
                &#9993;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
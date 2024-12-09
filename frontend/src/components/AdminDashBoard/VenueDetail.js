import React, { useEffect } from "react";
import "./VenueDetail.css";
import { Link, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

const VenueDetail = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trackResponse = await axios.get(
          "http://localhost:5000/api/v1/admin/track/getInfo",
          { params: { title: state.title } }
        );

        if (trackResponse.data) {
          const { venue, date, time, sessionChair, supervisor, rapparteur, facultyCoordinator } =
            trackResponse.data;
          setVenue(venue);
          setDate(new Date(date).toISOString().split("T")[0]);
          setTime(time);
          setSessionChair(sessionChair);
          setSupervisor(supervisor);
          setRapparteur(rapparteur);
          setFacultyCoordinator(facultyCoordinator);

          const authorsResponse = await axios.get(
            "http://localhost:5000/api/v1/author/getAllAuthor",
            { params: { id: trackResponse.data._id } }
          );
          console.log(authorsResponse.data);
          setAuthorsData(authorsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [state.title]);



  const [venue, setVenue] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [sessionChair, setSessionChair] = React.useState("");
  const [supervisor, setSupervisor] = React.useState("");
  const [facultyCoordinator, setFacultyCoordinator] = React.useState("");
  const [rapparteur, setRapparteur] = React.useState("");
  const [authorsData, setAuthorsData] = React.useState([]);
  


  const handleBackButtonClick = () => {
    alert("Go back to the previous page!");
  };

  const handleSubmitClick = async(e) => {
    e.preventDefault();
    if (
      !state.title ||
      !state.id ||
      !state.description ||
      !date ||
      !time ||
      !sessionChair ||
      !supervisor ||
      !rapparteur ||
      !venue ||
      !facultyCoordinator
    ) {
      alert("Please fill all the fields!");
      return;
    }
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
      console.log(data);
      const response = await axios.post("http://localhost:5000/api/v1/admin/track/save", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
              <select value={venue} id="VenueRoom" onChange={(e) => setVenue(e.target.value)}>
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
                <input id="appointment-time" type="date" name="appointment-time" value={date} onChange={(e) => setDate(e.target.value)}/>
              </th>
            </td>
            <td>
              <th>
                Time:-
                <input id="appointment-time" type="time" name="appointment-time" value={time} onChange={(e) => setTime(e.target.value)}/>
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
                  <select value={ supervisor} id="supervisor" onChange={(e) => setSupervisor(e.target.value)}>
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
                  <select value={sessionChair} id="sessionChair" onChange={(e) => setSessionChair(e.target.value)}>
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
                  <select value={ rapparteur} id="rapparteur" onChange={(e) => setRapparteur(e.target.value)}>
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
                  <select value={facultyCoordinator} id="facultyCoordinator" onChange={(e) => setFacultyCoordinator(e.target.value)}>
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
              <th>Status</th>
              <th>Presenter</th>
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
                    value={author.marks}
                    onChange={(e) => {
                      const updatedMarks = [...authorsData];
                      updatedMarks[index].marks = e.target.value;
                      // console.log(updatedMarks);
                      setAuthorsData(updatedMarks);
                    }}
                  />
                </td>
                <td rowSpan={author.members.length}>
                  <button
                    className="submit-btn"
                    style={{
                      backgroundColor: author.status === "pending" ? "red" : "#4CAF50",
                    }}
                  >
                    {author.status}
                  </button>
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
        <button className="add-work add-Paper" onClick={() => navigate('/admin/addAuthor', { state: state })}>
          <span>+ Add work</span>
        </button>
      </div>

      {/* Container for Authors */}
      {/* <div className="container">
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
      </div> */}
      <footer className="footer">
        copyright@CSIT Acropolis
      </footer>
    </div>
  );
};

export default VenueDetail;
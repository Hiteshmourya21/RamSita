import React, { useEffect } from "react";
import "./SessionDashboard.css";
import { Link, useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../lib/axios";

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
    try {
        const response = await axiosInstance.put(`/session/authors/bulk-update`, authorsData);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
  };



  return (
    // <div>
    // <h1>Welcome, {user.name}</h1>
    // <p>Email: {user.email}</p>
    // <p>Track: {user.track}</p>
    // </div>
    <div>
      {/* Container for Venue Details */}
      <div className="container">
        <header>
          <h1>RAMSITA-2025</h1>
        </header>
        <table>
          <tr>
            <th>
              Venue :-
              <p>{track.venue}</p>
            </th>
            <td>
              <th>
                Date:-
                <span>
                    {track.date.split("T")[0]}
                  {/* {new Date(track.date).toISOString().split("T")[0]} */}
                </span>
              </th>
            </td>
            <td>
              <th>
                Time:-
                <p>{track.time}</p>
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
                <td>Supervisors</td>
                <td>
                  <p>{track.supervisor}</p>
                </td>
              </tr>
          <tr>
                <td>Session Chair</td>
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
        <button onClick={handleSubmitEvent}>Submit</button>
      </div>
      <footer className="footer">
        copyright@CSIT Acropolis
      </footer>
    </div>
  );
};

export default SessionDashboard;
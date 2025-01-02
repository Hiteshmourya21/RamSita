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
        const facultyResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/faculty/getInfo`);
        if (facultyResponse.data.faculty) {
          setFacultyData(facultyResponse.data.faculty);

          const trackResponse = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/admin/track/getInfo`,
            { params: { title: state.title } }
          );

          if (trackResponse.data.track) {
            const { venue, date, time, sessionChair, supervisor, rapparteur, facultyCoordinator } =
              trackResponse.data.track;
            setVenue(venue);
            setDate(new Date(date).toISOString().split("T")[0]);
            setTime(time);
            setSessionChair(sessionChair);
            setSupervisor(supervisor);
            setRapparteur(rapparteur);
            setFacultyCoordinator(facultyCoordinator);

            const authorsResponse = await axios.get(
              `${process.env.REACT_APP_BASE_URL}/author/getAllAuthor`,
              { params: { id: trackResponse.data.track._id } }
            );
            setAuthorsData(authorsResponse.data);
          }
        } else {
          alert("No faculty found");
          navigate("/admin/addFaculty");
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
  const [facultyData, setFacultyData] = React.useState([]);

  // Filtering faculty data to exclude assigned faculty from the dropdown options
  const filteredFaculty = facultyData.filter(faculty =>
    faculty.name !== sessionChair && faculty.name !== supervisor && faculty.name !== rapparteur && faculty.name !== facultyCoordinator
  );

  const handleBackButtonClick = () => {
    alert("Go back to the previous page!");
  };

  const handleSubmitClick = async (e) => {
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
      title: state.title,
      trackNo: state.id.toString(),
      description: state.description,
      date,
      time,
      sessionChair,
      supervisor,
      rapparteur,
      venue,
      facultyCoordinator,
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/track/save`, data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
              Venue:
              <select value={venue} id="VenueRoom" onChange={(e) => setVenue(e.target.value)}>
                <option value=""></option>
                <option value="L341 3rd block 3 floor">L341 3rd block 3</option>
                <option value="L342 3rd block 3 floor">L342 3rd block 3</option>
                <option value="L343 3rd block 3 floor">L343 3rd block 3</option>
                <option value="L340 3rd block 3 floor">L340 3rd block 3</option>
              </select>
            </th>
            <td>
              <th>
                Date:
                <input id="appointment-time" type="date" name="appointment-time" value={date} onChange={(e) => setDate(e.target.value)} />
              </th>
            </td>
            <td>
              <th>
                Time:
                <input id="appointment-time" type="time" name="appointment-time" value={time} onChange={(e) => setTime(e.target.value)} />
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
              <select value={supervisor} id="supervisor" onChange={(e) => setSupervisor(e.target.value)}>
                <option value="">Select Faculty</option>
                {/* Add selected supervisor as option */}
                <option value={supervisor}>{supervisor}</option>
                {/* Render the rest of the filtered faculty */}
                {filteredFaculty.map(faculty => (
                  <option key={faculty._id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Session Chair</td>
            <td>
              <select value={sessionChair} id="sessionChair" onChange={(e) => setSessionChair(e.target.value)}>
                <option value="">Select Faculty</option>
                {/* Add selected session chair as option */}
                <option value={sessionChair}>{sessionChair}</option>
                {/* Render the rest of the filtered faculty */}
                {filteredFaculty.map(faculty => (
                  <option key={faculty._id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Rapporteur</td>
            <td>
              <select value={rapparteur} id="rapparteur" onChange={(e) => setRapparteur(e.target.value)}>
                <option value="">Select Faculty</option>
                {/* Add selected rapporteur as option */}
                <option value={rapparteur}>{rapparteur}</option>
                {/* Render the rest of the filtered faculty */}
                {filteredFaculty.map(faculty => (
                  <option key={faculty._id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>Faculty Coordinator</td>
            <td>
              <select value={facultyCoordinator} id="facultyCoordinator" onChange={(e) => setFacultyCoordinator(e.target.value)}>
                <option value="">Select Faculty</option>
                {/* Add selected faculty coordinator as option */}
                <option value={facultyCoordinator}>{facultyCoordinator}</option>
                {/* Render the rest of the filtered faculty */}
                {filteredFaculty.map(faculty => (
                  <option key={faculty._id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
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
                  {author.members[0].attendance?<span>P</span>:<span>A</span>}
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
                  {author.presenter}
                </td>
              </tr>
              {author.members.slice(1).map((member, idx) => (
                <tr key={idx}>
                  <td>{member.name}</td>
                  <td>
                  {member.attendance?<span>P</span>:<span>A</span>}
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

      <footer className="footer">
        copyright@CSIT Acropolis
      </footer>
    </div>
  );
};

export default VenueDetail;
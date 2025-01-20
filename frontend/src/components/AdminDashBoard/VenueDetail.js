import React, { useEffect, useState } from "react";
import "./VenueDetail.css";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";  // Correct import
import * as XLSX from "xlsx";
import { axiosInstance } from "../../lib/axios";


const VenueDetail = () => {
  const location = useLocation();
  const state = location.state || {};
  const trackNumber = state.title;
  const navigate = useNavigate();

  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sessionChair, setSessionChair] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [facultyCoordinator, setFacultyCoordinator] = useState("");
  const [rapparteur, setRapparteur] = useState("");
  const [authorsData, setAuthorsData] = useState([]);
  const [internalFacultyData, setInternalFacultyData] = useState([]);
  const [externalFacultyData, setExternalFacultyData] = useState([]);
  const [facultCoodinatorData, setFacultyCoordinatorData] = useState([]);
  const [rapparteurData, setRapparteurData] = useState([]);

  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facultyResponse = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/admin/faculty/getInfo`);
        if (facultyResponse.data) {
          setInternalFacultyData(facultyResponse.data.internalFaculty || []);
          setExternalFacultyData(facultyResponse.data.externalFaculty || []);
          setFacultyCoordinatorData(facultyResponse.data.facultyCoordinator || []);
          setRapparteurData(facultyResponse.data.student || []);
        } else {
          toast.error("No faculty found", { position: "top-right" });
          navigate("/admin/addFaculty");
          return;
        }

        const trackResponse = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/admin/track/getInfo`, {
          params: { title: state.title },
        });

        if (trackResponse.data.track) {
          const { venue, date, time, sessionChair, supervisor, rapparteur, facultyCoordinator } = trackResponse.data.track;
          setVenue(venue);
          setDate(date ? new Date(date).toISOString().split("T")[0] : "");
          setTime(time);
          setSessionChair(sessionChair);
          setSupervisor(supervisor);
          setRapparteur(rapparteur);
          setFacultyCoordinator(facultyCoordinator);
          
          const authorsResponse = await axiosInstance.get(`${process.env.REACT_APP_BASE_URL}/author/getAllAuthor`, {
            params: { id: trackResponse.data.track._id },
          });
          setAuthorsData(authorsResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data", { position: "top-right" });
      }
    };

    if (state.title) {
      fetchData();
    }
  }, [state.title, navigate]);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!state.title || !state.id || !state.description || !date || !time || !sessionChair || !supervisor || !rapparteur || !venue || !facultyCoordinator) {
      toast.error("Please fill all the fields!", { position: "top-right" });
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

    const loadingToastId = toast.loading("Saving track, please wait...", { position: "top-right" });

    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/admin/track/save`, data);
      toast.update(loadingToastId, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error(error);
      toast.update(loadingToastId, { render: "Error saving track. Please try again!", type: "error", isLoading: false, autoClose: 3000 });
    }
  };
  
  const internalFaculty = (internalFacultyData || []).filter(faculty => faculty.name !== supervisor);
  const externalFaculty = (externalFacultyData || []).filter(faculty => faculty.name !== sessionChair);
  const facultCoodinator = (facultCoodinatorData || []).filter(faculty => faculty.name !== facultyCoordinator);
  const studentFaculty = (rapparteurData || []).filter(faculty => faculty.name !== rapparteur);

  const handleReportClick = () => {
    setShowReportModal(true);
  };
 
  
const generateReport = (format) => {
  const fileName = `Track_${trackNumber}_report`;

  if (format === "pdf") {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Track ${trackNumber} Report`, 10, 10);

    // Define Table Data
    const tableColumn = ["Paper ID", "Paper Title", "Author(s)", "Presenter", "Marks", "Status"];
    const tableRows = authorsData.map((author) => [
      author.pid,
      author.title,
      author.members.map(member => member.name).join(", "),
      author.presenter,
      author.marks,
      author.status
    ]);

    // Generate the table using autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`${fileName}.pdf`);
  } else if (format === "excel") {
    const ws = XLSX.utils.json_to_sheet(
      authorsData.map((author) => ({
        "Paper ID": author.pid,
        "Paper Title": author.title,
        "Author(s)": author.members.map(member => member.name).join(", "),
        "Presenter": author.presenter,
        "Marks": author.marks,
        "Status": author.status
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Track Report");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  setShowReportModal(false);
};
  
  
  
  

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="container">
        <header>
          <div className="header-content">
          <button className="back-button">
            <Link to="/admin/dashboard">
              <strong>←</strong>
            </Link>
          </button>
          <h1>RAMSITA-2025</h1>
          </div>
          <div>
          <button className="report-button" onClick={handleReportClick}>
            Generate Report
          </button>
          </div>
        </header>

        {showReportModal && (
          <div className="modal">
            <div className="modal-content">
              <button onClick={() => generateReport("pdf")}>PDF</button>
              <button onClick={() => generateReport("excel")}>Excel</button>
              <button className="cancel-button" onClick={() => setShowReportModal(false)}>Cancel</button>
            </div>
          </div>
        )}


        <table>
          <tr>
            <th>
              Venue:
              <select value={venue} id="VenueRoom" onChange={(e) => setVenue(e.target.value)}>
                <option value=""></option>
                <option value="L341 3rd block 3 floor">Lab 341 3rd block 3</option>
                <option value="L342 3rd block 3 floor">Lab 342 3rd block 3</option>
                <option value="L343 3rd block 3 floor">Lab 343 3rd block 3</option>
                <option value="L340 3rd block 3 floor">Lab 340 3rd block 3</option>
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
            <td>Internal Session Chair</td>
            <td>
              <select value={supervisor} id="supervisor" onChange={(e) => setSupervisor(e.target.value)}>
                <option value="">Select Faculty</option>
                {/* Add selected supervisor as option */}
                <option value={supervisor}>{supervisor}</option>
                {/* Render the rest of the filtered faculty */}
                {internalFaculty.map(faculty => (
                  <option key={faculty._id} value={faculty.name}>
                    {faculty.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>External Session Chair</td>
            <td>
              <select value={sessionChair} id="sessionChair" onChange={(e) => setSessionChair(e.target.value)}>
                <option value="">Select Faculty</option>
                {/* Add selected session chair as option */}
                <option value={sessionChair}>{sessionChair}</option>
                {/* Render the rest of the filtered faculty */}
                {externalFaculty.map(faculty => (
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
                {studentFaculty.map(faculty => (
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
                {facultCoodinator.map(faculty => (
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
          {[...authorsData]
            .sort((a, b) => b.marks - a.marks) // Sorting in descending order
            .map((author, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td rowSpan={author.members.length}>{author.pid}</td>
                  <td rowSpan={author.members.length}>{author.title}</td>
                  <td>{author.members[0].name}</td>
                  <td>{author.members[0].attendance ? <span>P</span> : <span>A</span>}</td>
                  <td rowSpan={author.members.length}>
                    <input
                      type="number"
                      value={author.marks}
                      onChange={(e) => {
                        const updatedMarks = [...authorsData];
                        updatedMarks[index].marks = e.target.value;
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
                  <td rowSpan={author.members.length}>{author.presenter}</td>
                </tr>
                {author.members.slice(1).map((member, idx) => (
                  <tr key={idx}>
                    <td>{member.name}</td>
                    <td>{member.attendance ? <span>P</span> : <span>A</span>}</td>
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
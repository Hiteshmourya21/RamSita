// import React, { useState } from 'react';
import styles from './App.module.css';
import Admin from './components/AdminDashBoard/Admin';
import VenueDetail from './components/AdminDashBoard/VenueDetail';
import AddAuthor from './components/Author/AddAuthor';
import LoginForm from './components/frontpage/LoginForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SessionDashboard from './components/SessionChair/SessionDashboard';
import AuthorDashboard from './components/Author/AuthorDashboard';
import AddFaculty from './components/AddFaculty';
import AddPresentationPage from './components/Author/AddPresentaionPage';

const App = () => {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={< LoginForm />} />
          <Route path="/admin/TrackDetail" element={<VenueDetail />} />
          <Route path="/admin/addAuthor" element={<AddAuthor />} />
          <Route path="/admin/dashboard" element={< Admin />} />
          <Route path="/admin/addFaculty" element={< AddFaculty />} />
          <Route path="/session/dashboard" element={< SessionDashboard />} />
          <Route path="/author/dashboard" element={< AuthorDashboard />} />
          <Route path="/add-presentation" element={< AddPresentationPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


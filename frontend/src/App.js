// import React, { useState } from 'react';
import styles from './App.module.css';
import Admin from './components/AdminDashBoard/Admin';
import VenueDetail from './components/AdminDashBoard/VenueDetail';
import AddAuthor from './components/Author/AddAuthor';
import LoginForm from './components/frontpage/LoginForm';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {

  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={< LoginForm />} />
          <Route path="/admin/TrackDetail" element={<VenueDetail />} />
          <Route path="/admin/addAuthor" element={<AddAuthor />} />
          <Route path="/admin/dashboard" element={< Admin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;


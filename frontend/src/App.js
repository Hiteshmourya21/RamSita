import React from 'react';
import styles from './App.module.css';
import Admin from './components/AdminDashBoard/Admin';
import VenueDetail from './components/AdminDashBoard/VenueDetail';
import AddAuthor from './components/Author/AddAuthor';
import LoginForm from './components/frontpage/LoginForm';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import SessionDashboard from './components/SessionChair/SessionDashboard';
import AuthorDashboard from './components/Author/AuthorDashboard';
import AddFaculty from './components/AddFaculty';
import AddPresentationPage from './components/Author/AddPresentaionPage';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/admin/TrackDetail"
            element={!token ? <Navigate to="/" /> : <VenueDetail />}
          />
          <Route
            path="/admin/addAuthor"
            element={!token ? <Navigate to="/" /> : <AddAuthor />}
          />
          <Route
            path="/admin/dashboard"
            element={!token ? <Navigate to="/" /> : <Admin />}
          />
          <Route
            path="/admin/addFaculty"
            element={!token ? <Navigate to="/" /> : <AddFaculty />}
          />
          <Route
            path="/session/dashboard"
            element={!token ? <Navigate to="/" /> : <SessionDashboard />}
          />
          <Route
            path="/author/dashboard"
            element={!token ? <Navigate to="/" /> : <AuthorDashboard />}
          />
          <Route
            path="/add-presentation"
            element={!token ? <Navigate to="/" /> : <AddPresentationPage />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

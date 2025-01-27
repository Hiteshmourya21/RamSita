import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import Admin from "./components/AdminDashBoard/Admin";
import VenueDetail from "./components/AdminDashBoard/VenueDetail";
import AddAuthor from "./components/Author/AddAuthor";
import LoginForm from "./components/frontpage/LoginForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SessionDashboard from "./components/SessionChair/SessionDashboard";
import AuthorDashboard from "./components/Author/AuthorDashboard";
import AddFaculty from "./components/AddFaculty";
import AddPresentationPage from "./components/Author/AddPresentaionPage";
import { axiosInstance } from "./lib/axios";

// ProtectedRoute Component
const ProtectedRoute = ({ user, role, children }) => {
  if (!user || user.role !== role) {
    return <Navigate to="/" />;
  }
  return children;
};

// AuthRedirect Component
const AuthRedirect = ({ token, setUser, setLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user data...");
        const response = await axiosInstance.get("/auth/getCurrentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User data fetched:", response.data);

        // Set user data and stop loading
        setUser(response.data);
        setLoading(false);

        // Navigate based on role
        if (response.data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (response.data.role === "sessionChair") {
          navigate("/session/dashboard", { state: response.data.email });
        } else if (response.data.role === "author") {
          navigate("/author/dashboard", { state: response.data.email });
        }
      } catch (error) {
        console.error("Error fetching user:", error.response?.data || error.message);
        setLoading(false);
        navigate("/"); // Redirect to login on error
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false); // Stop loading if no token is present
    }
  }, [token, setUser, setLoading, navigate]);

  return null;
};

const App = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(false); // Loading state for async calls

  return (
    <Router>
      <div className={styles.app}>
        {/* Redirect Logic */}


        {token && !user  &&
          <AuthRedirect token={token} setUser={setUser} setLoading={setLoading} />
        }

        {/* Loading Screen */}
        {loading ? (
          <div className={styles.loadingScreen}>Loading...</div>
        ) : (
          <Routes>
            {/* Public route */}
            <Route path="/" element={<LoginForm />} />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute user={user} role="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/TrackDetail"
              element={
                <ProtectedRoute user={user} role="admin">
                  <VenueDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/addAuthor"
              element={
                <ProtectedRoute user={user} role="admin">
                  <AddAuthor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/addFaculty"
              element={
                <ProtectedRoute user={user} role="admin">
                  <AddFaculty />
                </ProtectedRoute>
              }
            />

            {/* Session Chair routes */}
            <Route
              path="/session/dashboard"
              element={
                <ProtectedRoute user={user} role="sessionChair">
                  <SessionDashboard />
                </ProtectedRoute>
              }
            />

            {/* Author routes */}
            <Route
              path="/author/dashboard"
              element={
                <ProtectedRoute user={user} role="author">
                  <AuthorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-presentation"
              element={
                <ProtectedRoute user={user} role="author">
                  <AddPresentationPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddMovies from "./AddMovies";
import LoggerDetails from "./LoggerDetails";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-page">
      {/* Navbar */}
      <nav className="admin-navbar">
        <h2 className="admin-title">Admin Panel</h2>
        <div className="admin-buttons">
          <button onClick={() => setActiveSection("add-movies")}>Add Movies</button>
          <button onClick={() => setActiveSection("logger-details")}>Logger Details</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Sections */}
      {activeSection === "add-movies" && <AddMovies />}
      {activeSection === "logger-details" && <LoggerDetails />}
    </div>
  );
};

export default AdminPage;

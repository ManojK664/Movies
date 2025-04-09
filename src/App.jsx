import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import UserPage from "./Components/User/UserPage";
import AdminPage from "./Components/Admin/AdminPage";
import AddMovies from "./Components/Admin/AddMovies";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add-movies" element={<AddMovies />} />
      </Routes>
    </Router>
  );
};

export default App;

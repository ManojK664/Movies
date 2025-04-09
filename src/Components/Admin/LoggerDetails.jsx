import React, { useEffect, useState } from "react";
import axios from "axios";

const LoggerDetails = () => {
  const [loggers, setLoggers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/loggers")
      .then((response) => {
        setLoggers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loggers:", error);
      });
  }, []);

  return (
    <div className="admin-container">
      <h2>Loggers Details</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Login Time</th>
          </tr>
        </thead>
        <tbody>
          {loggers.map((logger, index) => (
            <tr key={index}>
              <td>{logger.email}</td>
              <td>{logger.role}</td>
              <td>{new Date(logger.login_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoggerDetails;

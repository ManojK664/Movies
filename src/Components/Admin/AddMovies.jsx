import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddMovies.css";

const AddMovies = () => {
  const [movieName, setMovieName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!movieName || !category || !image) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editingMovie) {
        await axios.put(`http://localhost:5000/editMovie/${editingMovie.id}`, {
          movieName,
          category,
          image,
        });
        alert("Movie updated successfully!");
      } else {
        await axios.post("http://localhost:5000/addMovie", {
          movieName,
          category,
          image,
        });
        alert("Movie uploaded successfully!");
      }

      setMovieName("");
      setCategory("");
      setImage("");
      setEditingMovie(null);
      fetchMovies();
    } catch (error) {
      console.error("Error adding/updating movie:", error);
      alert("Error uploading movie.");
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setMovieName(movie.name);
    setCategory(movie.category);
    setImage(movie.file_path);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteMovie/${id}`);
      alert("Movie deleted successfully!");
      fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Error deleting movie.");
    }
  };

  return (
    <div className="add-movies-container">
      <h2>{editingMovie ? "Edit Movie" : "Add Movies"}</h2>

      <form onSubmit={handleUpload} className="add-movies-form">
        <div className="form-group">
          <label>Movie Name:</label>
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            required
            placeholder="Enter movie name"
          />
        </div>

        <div className="form-group">
          <label>Movie Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="Action">Action</option>
            <option value="Horror">Horror</option>
            <option value="Cartoon">Cartoon</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        <div className="form-group">
          <label>Movie URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="Enter movie URL"
          />
        </div>
        <button type="submit" className="btn-primary">
          {editingMovie ? "Update Movie" : "Upload"}
        </button>
      </form>
      <h3>Movies List</h3>
      <div className="movies-list">
        <table className="movies-table">
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{movie.category}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(movie)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(movie.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddMovies;
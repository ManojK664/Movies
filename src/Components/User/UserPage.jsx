import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserPage.css";

const UserPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setShowFavourites(false);
  };

  const addToFavourites = (movie) => {
    if (!favourites.some((fav) => fav.id === movie.id)) {
      setFavourites([...favourites, movie]);
    }
  };

  const filteredMovies =
    selectedCategory === "All"
      ? movies
      : movies.filter((movie) => movie.category === selectedCategory);

  return (
    
    <div className="user-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand">Movies Platform</a>
          <select className="form-select w-auto mx-3" onChange={handleCategoryChange}>
            <option value="All">Category</option>
            <option value="Action">Action</option>
            <option value="Horror">Horror</option>
            <option value="Cartoon">Cartoon</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
          <button className="btn btn-warning mx-2" onClick={() => setShowFavourites(!showFavourites)}>
            {showFavourites ? "Back to Movies" : "Favourites"}
          </button>
          <button className="btn btn-danger" onClick={() => navigate("/")}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row justify-content-center">
          {(showFavourites ? favourites : filteredMovies).map((movie) => (
            <div key={movie.id} className="col-md-3 col-sm-6">
              <div className="card movie-card">
                <img
                  src={movie.file_path}
                  className="card-img-top"
                  alt={movie.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.name}</h5>
                  {!showFavourites && (
                    <button className="btn btn-dark" onClick={() => addToFavourites(movie)}>
                      Add to Favourites
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;

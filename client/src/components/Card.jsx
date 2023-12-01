import React, { useState, useEffect } from "react";
import "./card.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function Card({ movie }) {
  const [movieData, setMovieData] = useState(movie);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number_of_seasons: 0,
    number_of_episodes: 0,
    vote_count: 0,
    vote_average: 0.0,
    overview: "",
    adult: false,
    backdrop_path: "",
    first_air_date: "",
    last_air_date: "",
    homepage: "",
    popularity: 0.0,
    poster_path: "",
    tagline: "",
    genres: [],
    created_by: [],
    networks: [],
    episode_run_time: 0,
    active: false,
  });
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "tvshow/"
      : "http://localhost:5000/tvshow";
  useEffect(() => {
    if (movieData) {
      // If movie data is available, populate the form fields
      setFormData({
        name: movieData.name || "",
        number_of_seasons: movieData.number_of_seasons || 0,
        number_of_episodes: movieData.number_of_episodes || 0,
        vote_count: movieData.vote_count || 0,
        vote_average: movieData.vote_average || 0.0,
        overview: movieData.overview || "",
        adult: movieData.adult || false,
        backdrop_path: movieData.backdrop_path || "",
        first_air_date: movieData.first_air_date || "",
        last_air_date: movieData.last_air_date || "",
        homepage: movieData.homepage || "",
        popularity: movieData.popularity || 0.0,
        poster_path: movieData.poster_path || "",
        tagline: movieData.tagline || "",
        genres: movieData.genres || [],
        created_by: movieData.created_by || [],
        networks: movieData.networks || [],
        episode_run_time: movieData.episode_run_time || 0,
        active: movieData.active || false,
      });
    }
  }, [movieData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const deleteMovie = async (id) => {
    try {
      const deleteTodo = await fetch(`${baseURL}/${movie.id}`, {
        method: "DELETE",
      });
      const movieArray = Object.values(movieData);

      // Filter the array
      const filteredMovies = movieArray.filter(
        (movieDel) => movieDel.id !== id
      );

      // Convert the filtered array back to an object
      const updatedMovieData = filteredMovies.reduce((obj, movie) => {
        obj[movie.id] = movie;
        return obj;
      }, {});

      // Set the updated movie data
      setMovieData(updatedMovieData);
      setShowDeleteModal(true);
      window.location.reload(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  // Submit the form data to your backend
  const onSubmitForm = async (e) => {
    e.preventDefault();

    const convertedData = {
      ...formData,
      number_of_seasons: parseInt(formData.number_of_seasons),
      number_of_episodes: parseInt(formData.number_of_episodes),
      vote_count: parseInt(formData.vote_count),
      vote_average: parseFloat(formData.vote_average),
      popularity: parseFloat(formData.popularity),
      episode_run_time: parseInt(formData.episode_run_time),
      genres:
        formData.genres && typeof formData.genres === "string"
          ? formData.genres.split(",").map((genre) => genre.trim())
          : [],

      created_by: [formData.created_by],
      networks: [formData.networks],
    };

    try {
      const response = await fetch(`${baseURL}/${movie.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertedData),
      });
      window.location.reload(true);
      setMovieData(formData);
    } catch (error) {
      console.error(error.message);
    }
    setFormData({
      name: "",
      number_of_seasons: 0,
      number_of_episodes: 0,
      vote_count: 0,
      vote_average: 0.0,
      overview: "",
      adult: false,
      backdrop_path: "",
      first_air_date: "",
      last_air_date: "",
      homepage: "",
      popularity: 0.0,
      poster_path: "",
      tagline: "",
      genres: [],
      created_by: [],
      networks: [],
      episode_run_time: 0,
      active: false,
    });
  };

  const handleClose = () => setShowModal(false);
  const handleEdit = () => setShowModal(true);
  const handleDelete = () => setShowDeleteModal(true);
  const handleDeleteClose = () => setShowDeleteModal(false);
  return (
    <div className="col-lg-2 col-md-4 col-sm-6">
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/original/${movieData.poster_path}`}
          alt="Preview Image"
          className="img-fluid"
        />
        <p>
          {new Date(movieData.first_air_date).getFullYear()} |{" "}
          {movieData.genres && movieData.genres.length > 0
            ? movieData.genres[0].split("&")[0].trim()
            : "No genre"}
        </p>
        <div className="content">
          <h4>{movie.name}</h4>
          <div className="card-icons">
            <ion-icon name="create-outline" onClick={handleEdit}></ion-icon>

            <ion-icon name="trash-outline" onClick={handleDelete}></ion-icon>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <Modal
          show={handleDelete}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={handleDeleteClose}
          style={{ zIndex: 9999 }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`Do you want to delete ${movieData.name} ?`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Close
            </Button>
            <Button className="primary" onClick={deleteMovie}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showModal && (
        <div className="modal-background">
          <div className="modal-content">
            <form onSubmit={onSubmitForm}>
              <div className="row mb-3">
                <label htmlFor="name">Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label htmlFor="number_of_seasons" className="text-light">
                Number of seasons
              </label>

              <input
                type="number"
                className="form-control"
                id="number_of_seasons"
                name="number_of_seasons"
                value={formData.number_of_seasons}
                onChange={handleChange}
                placeholder="Enter number of seasons"
                required
              />
              <label htmlFor="number_of_episodes" className="text-light">
                Number of episodes
              </label>

              <input
                type="number"
                className="form-control"
                id="number_of_episodes"
                name="number_of_episodes"
                value={formData.number_of_episodes}
                onChange={handleChange}
                placeholder="Enter number of episodes"
                required
              />
              <label htmlFor="vote_count" className="text-light">
                Vote count
              </label>

              <input
                type="number"
                className="form-control"
                id="vote_count"
                name="vote_count"
                value={formData.vote_count}
                onChange={handleChange}
                placeholder="Enter vote count"
                required
              />
              <label htmlFor="overview" className="text-light">
                Overview
              </label>

              <input
                type="text"
                className="form-control"
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                placeholder="Enter overview"
                required
              />

              <label htmlFor="adult" className="text-light">
                Adult
              </label>

              <select
                className="form-select"
                id="adult"
                name="adult"
                value={formData.adult}
                onChange={handleChange}
                placeholder="Enter overview"
                required
              >
                <option value="">Select option</option>
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
              </select>

              <label htmlFor="backdrop_path" className="text-light">
                Backdrop Path
              </label>

              <input
                type="text"
                className="form-control"
                id="backdrop_path"
                name="backdrop_path"
                value={formData.backdrop_path}
                onChange={handleChange}
                placeholder="Enter backdrop path"
                required
              />

              <label htmlFor="first_air_date" className="text-light">
                first air date
              </label>

              <input
                type="text"
                className="form-control"
                id="first_air_date"
                name="first_air_date"
                value={formData.first_air_date}
                onChange={handleChange}
                placeholder="Enter first air date"
                required
              />

              <label htmlFor="last_air_date" className="text-light">
                last air date
              </label>

              <input
                type="text"
                className="form-control"
                id="last_air_date"
                name="last_air_date"
                value={formData.last_air_date}
                onChange={handleChange}
                placeholder="Enter last air date"
                required
              />

              <label htmlFor="homepage" className="text-light">
                homepage
              </label>

              <input
                type="text"
                className="form-control"
                id="homepage"
                name="homepage"
                value={formData.homepage}
                onChange={handleChange}
                placeholder="Enter homepage"
                required
              />

              <label htmlFor="popularity" className="text-light">
                popularity
              </label>

              <input
                type="text"
                className="form-control"
                id="popularity"
                name="popularity"
                value={formData.popularity}
                onChange={handleChange}
                placeholder="Enter popularity"
                required
              />
              <label htmlFor="poster_path" className="text-light">
                poster_path
              </label>

              <input
                type="text"
                className="form-control"
                id="poster_path"
                name="poster_path"
                value={formData.poster_path}
                onChange={handleChange}
                placeholder="Enter poster_path"
                required
              />
              <label htmlFor="tagline" className="text-light">
                tagline
              </label>

              <input
                type="text"
                className="form-control"
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Enter tagline"
                required
              />
              <label htmlFor="genres" className="text-light">
                tagline
              </label>

              <input
                type="text"
                className="form-control"
                id="genres"
                name="genres"
                value={formData.genres}
                onChange={handleChange}
                placeholder="Enter genres"
                required
              />

              <label htmlFor="created_by" className="text-light">
                created by
              </label>

              <input
                type="text"
                className="form-control"
                id="created_by"
                name="created_by"
                value={formData.created_by}
                onChange={handleChange}
                placeholder="Enter created by"
                required
              />

              <label htmlFor="networks" className="text-light">
                networks
              </label>
              <input
                type="text"
                className="form-control"
                id="networks"
                name="networks"
                value={formData.networks}
                onChange={handleChange}
                placeholder="Enter networks"
                required
              />
              <label htmlFor="episode_run_time" className="text-light">
                episode_run_time
              </label>

              <input
                type="number"
                className="form-control"
                id="episode_run_time"
                name="episode_run_time"
                value={formData.episode_run_time}
                onChange={handleChange}
                placeholder="Enter episode run time"
                required
              />

              <label htmlFor="active" className="text-light">
                Active
              </label>
              <select
                className="form-select"
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                placeholder="Enter active status"
                required
              >
                <option value="">Select option</option>
                <option value="true">TRUE</option>
                <option value="false">FALSE</option>
              </select>
              <div className="modal-close" onClick={handleClose}>
                Close
              </div>

              <div style={{ marginTop: "10px", display: "block" }}>
                <Button
                  variant="primary"
                  onClick={onSubmitForm}
                  style={{ marginBottom: "10px", marginRight: "10px" }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="danger"
                  onClick={handleClose}
                  style={{ marginBottom: "10px" }}
                >
                  Close
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;

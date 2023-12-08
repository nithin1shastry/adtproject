import React, { useState, useEffect } from "react";

const AddSeriesForm = () => {
  const [seriesData, setSeriesData] = useState([]);
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

  const [show, setShow] = useState(true);

  const baseURL =
    process.env.NODE_ENV === "production"
      ? "http://localhost:5000/tvshow/"
      : "http://localhost:5000/tvshow";
  const fetchSeriesData = async () => {
    try {
      const response = await fetch(baseURL);
      const data = await response.json();
      setSeriesData(data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    // Fetch series data when component mounts
    fetchSeriesData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
      genres: formData.genres.split(",").map((genre) => genre.trim()),
      created_by: [formData.created_by],
      networks: [formData.networks],
    };

    try {
      console.log(`formdata: ${JSON.stringify(convertedData)}`);
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(convertedData),
      });
      window.location = "/";
      window.location.reload(true);
      fetchSeriesData();
      // Handle success or redirect as needed
      // console.log(response);
      //handleClose();
    } catch (error) {
      console.log("In the error");
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

  return (
    <section id="addSeries" className="addSeries">
      <div className="container-fluid">
        <div className="row">
          <h4 className="section-title">Add Series</h4>
        </div>
        <div className="container mt-4">
          <form onSubmit={onSubmitForm}>
            {/* Add form fields for each attribute */}
            <div className="row mb-3">
              <label htmlFor="name" className="text-light">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter series name"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="number_of_seasons" className="text-light">
                Number of seasons
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="number_of_episodes" className="text-light">
                Number of episodes
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="vote_count" className="text-light">
                Vote count
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="overview" className="text-light">
                Overview
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="adult" className="text-light">
                Adult
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="backdrop_path" className="text-light">
                Backdrop Path
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="first_air_date" className="text-light">
                first air date
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="last_air_date" className="text-light">
                last air date
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="homepage" className="text-light">
                homepage
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="popularity" className="text-light">
                popularity
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="poster_path" className="text-light">
                poster_path
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="tagline" className="text-light">
                tagline
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="genres" className="text-light">
                genre
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="created_by" className="text-light">
                created by
              </label>

              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="networks" className="text-light">
                networks
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="episode_run_time" className="text-light">
                episode_run_time
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            <div className="row mb-3">
              <label htmlFor="active" className="text-light">
                Active
              </label>
              <div className="col-sm-10">
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
              </div>
            </div>

            {/* Repeat this pattern for other fields */}
            {/* ... */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                background: "#000000",
                color: "#ffffff",
                transition: "background 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "var(--primary)";
                e.currentTarget.style.color = "#000000";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddSeriesForm;

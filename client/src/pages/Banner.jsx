import React, { useState, useEffect } from "react";
import "./banner.css";
import MovieContent from "../components/MovieContent";
import MovieDate from "../components/MovieDate";
import MovieSwiper from "../components/MovieSwiper";
import Schedule from "./Schedule";

function Banner() {
  const [movies, setMovies] = useState([]);
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "tvshow/"
      : "http://localhost:5000/tvshow";
  const fetchData = async () => {
    try {
      const response = await fetch(baseURL);
      const jsonData = await response.json();
      //console.log(jsonData);
      setMovies(jsonData);
      //console.log(movies);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSlideChange = (id) => {
    const newMovies = movies.map((movie) => {
      movie.active = false;
      if (movie.id === id) {
        movie.active = true;
      }
      return movie;
    });
    setMovies(newMovies);
  };
  return (
    <div className="banner">
      {movies &&
        movies.length > 0 &&
        movies.map((movie, index) => (
          <div className="movie" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt="Background Image"
              className={`bgImg ${movie.active ? "active" : undefined}`}
            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <MovieDate movie={movie} />
                  {/*<PlayBtn movie={movie} />*/}
                </div>
                <div className="col-lg-6 col-md-12">
                  <MovieContent movie={movie} />
                </div>
              </div>
            </div>
          </div>
        ))}

      {movies && movies.length > 0 && (
        <MovieSwiper slides={movies} slideChange={handleSlideChange} />
      )}
    </div>
  );
}

export default Banner;

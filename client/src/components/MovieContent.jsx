import React from "react";
import "./movieContent.css";
import Button from "./Button";
function MovieContent({ movie }) {
  return (
    <div className={`content ${movie.active ? "active" : undefined}`}>
      <h4>
        <span>{new Date(movie.first_air_date).getFullYear()}</span>
        <span>
          <i>{movie.adult ? "ADULT" : "U/A"}</i>
        </span>

        <span>{movie && movie.genres[0]}</span>
      </h4>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieContent;

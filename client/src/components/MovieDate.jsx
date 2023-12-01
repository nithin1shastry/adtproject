import React from "react";
import "./movieDate.css";
function MovieDate({ movie }) {
  return (
    <div className={`date ${movie.active ? "active" : undefined}`}>
      <h2>{movie.name}</h2>
    </div>
  );
}

export default MovieDate;

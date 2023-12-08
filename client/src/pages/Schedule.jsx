import React, { useState, useEffect } from "react";
import "./schedule.css";
import Card from "../components/Card";
import "./../data/filterListData";
import filterListData from "./../data/filterListData";
import AddSeriesForm from "../components/AddSeriesForm";

function Schedule() {
  const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState(filterListData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(18); // Change this value to the number of items per page

  const baseURL =
    process.env.NODE_ENV === "production"
      ? "http://localhost:5000/tvshow/"
      : "http://localhost:5000/tvshow";
  const fetchData = async () => {
    try {
      const response = await fetch(baseURL);
      const jsonData = await response.json();
      //console.log(jsonData);
      setData(jsonData);
      //console.log(movies);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setMovies(data);
    setCurrentPage(1);
  }, [data]);

  const handleFilterMovies = (category) => {
    setFilters(
      filterListData.map((filter) => {
        filter.active = false;
        if (filter.name === category) {
          filter.active = true;
        }
        return filter;
      })
    );

    if (category === "All") {
      setMovies(data);
      return;
    }

    setMovies(
      data.filter((movie) => {
        if (movie.genres && movie.genres.length > 0) {
          const firstGenre = movie.genres[0];
          if (firstGenre.includes("&")) {
            const splitGenres = firstGenre.split("&");
            return splitGenres[0].trim() === category;
          } else {
            return firstGenre.trim() === category;
          }
        }
        return [];
      })
    );

    const pageCount = Math.ceil(movies.length / itemsPerPage);
    if (currentPage > pageCount) {
      setCurrentPage(pageCount || 1); // Reset to the first page if the current page exceeds the available pages
    }
  };

  const handleFilterNetworks = (network) => {
    setFilters(
      filterListData.map((filter) => {
        filter.active = false;
        if (filter.name === network) {
          filter.active = true;
        }
        return filter;
      })
    );

    if (network === "All") {
      setMovies(data);
      return;
    }

    setMovies(
      data.filter((movie) => {
        return movie.networks.includes(network); // Assuming 'networks' is an array containing network names
      })
    );

    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);

  // Function to scroll to the top when changing pages
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="schedule" className="schedule">
      <div className="container-fluid">
        <div className="row">
          <h4 className="section-title">List of Series</h4>
        </div>
        <div className="row">
          <ul className="filters">
            {filterListData.map((filter) => (
              <li
                key={filter._id}
                className={`${filter.active ? "active" : undefined}`}
                onClick={() => {
                  if (filter.isNetwork) {
                    handleFilterNetworks(filter.name);
                  } else {
                    handleFilterMovies(filter.name);
                  }
                }}
              >
                {filter.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="row mt-5">
          {currentMovies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
        <nav>
          <ul className="pagination">
            {movies.length > itemsPerPage &&
              Math.ceil(movies.length / itemsPerPage) > 1 &&
              Array.from(
                { length: Math.ceil(movies.length / itemsPerPage) },
                (_, index) => (
                  <li key={index + 1} className="page-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
          </ul>
        </nav>
        <AddSeriesForm />
      </div>
    </section>
  );
}

export default Schedule;

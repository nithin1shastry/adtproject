require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//ROUTES//

//CREATE A TV SHOW

app.post("/tvshow", async (req, res) => {
  try {
    const {
      name,
      number_of_seasons,
      number_of_episodes,
      vote_count,
      vote_average,
      overview,
      adult,
      backdrop_path,
      first_air_date,
      last_air_date,
      homepage,
      popularity,
      poster_path,
      tagline,
      genres,
      created_by,
      networks,
      episode_run_time,
      active,
    } = req.body;

    const newTvshow = await pool.query(
      `INSERT INTO tv_shows (
          name, number_of_seasons, number_of_episodes, vote_count,
          vote_average, overview, adult, backdrop_path, first_air_date, last_air_date,
          homepage, popularity, poster_path, tagline, genres, created_by, networks, episode_run_time, active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *`,
      [
        name,
        number_of_seasons,
        number_of_episodes,
        vote_count,
        vote_average,
        overview,
        adult,
        backdrop_path,
        first_air_date,
        last_air_date,
        homepage,
        popularity,
        poster_path,
        tagline,
        genres,
        created_by,
        networks,
        episode_run_time,
        active,
      ]
    );
    res.json(newTvshow.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

//GET ALL TV SHOWS
app.get("/tvshow", async (req, res) => {
  try {
    const allTvShows = await pool.query("SELECT * FROM tv_shows");
    res.json(allTvShows.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//GET A TV SHOW
app.get("/tvshow/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tvshow = await pool.query("SELECT * FROM tv_shows WHERE id = $1", [
      id,
    ]);
    res.json(tvshow.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//UPDATE A TV SHOW
// Assuming you have initialized 'app' and 'pool' (PostgreSQL pool) somewhere in your code

// Update a TV show by ID
app.put("/tvshow/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Extract properties from the request body that need to be updated
    const {
      name,
      number_of_seasons,
      number_of_episodes,
      vote_count,
      vote_average,
      overview,
      adult,
      backdrop_path,
      first_air_date,
      last_air_date,
      homepage,
      popularity,
      poster_path,
      tagline,
      genres,
      created_by,
      networks,
      episode_run_time,
      active,
      // Add other properties here that you want to update
    } = req.body;

    // Run an SQL UPDATE query to update the TV show with the provided ID
    const updateTvShowQuery = `
      UPDATE tv_shows 
      SET 
        name = $1, 
        number_of_seasons = $2, 
        number_of_episodes = $3, 
        vote_count = $4,
        vote_average = $5,
        overview = $6,
        adult = $7,
        backdrop_path = $8,
        first_air_date = $9,
        last_air_date = $10,
        homepage = $11,
        popularity = $12,
        poster_path = $13,
        tagline = $14,
        genres = $15,
        created_by = $16,
        networks = $17,
        episode_run_time = $18,
        active = $19
        /* Add other columns here with respective placeholders */
      WHERE id = $20
    `;

    // Execute the query with the provided parameters
    await pool.query(updateTvShowQuery, [
      name,
      number_of_seasons,
      number_of_episodes,
      vote_count,
      vote_average,
      overview,
      adult,
      backdrop_path,
      first_air_date,
      last_air_date,
      homepage,
      popularity,
      poster_path,
      tagline,
      genres,
      created_by,
      networks,
      episode_run_time,
      active,
      // Add other parameters for update
      id, // ID should be the last parameter as per the WHERE clause
    ]);

    // Sending a success response
    res
      .status(200)
      .json({ message: `TV show with ID ${id} updated successfully` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Other necessary configurations and routes...

//DELETE A TV SHOW
app.delete("/tvshow/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletTvShow = await pool.query("DELETE FROM tv_shows WHERE id = $1", [
      id,
    ]);
    res.json("tv_show was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

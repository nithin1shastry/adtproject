CREATE DATABASE adtproject;

CREATE TABLE tv_shows (
    id int auto_increment PRIMARY KEY,
    name VARCHAR(255),
    number_of_seasons INT,
    number_of_episodes INT,
    vote_count INT,
    vote_average FLOAT,
    overview TEXT,
    adult BOOLEAN,
    backdrop_path VARCHAR(255),
    first_air_date DATE,
    last_air_date DATE,
    homepage VARCHAR(255),
    popularity FLOAT,
    poster_path VARCHAR(255),
    tagline TEXT,
    genres TEXT[], 
    created_by TEXT[], 
    networks TEXT[], 
    episode_run_time INT,
    active BOOLEAN

);
CREATE DATABASE adtproject;

CREATE TABLE tv_shows (
    id INT auto_increment PRIMARY KEY,
    name VARCHAR(255),
    number_of_seasons INT,
    number_of_episodes INT,
    //original_language VARCHAR(50),
    vote_count INT,
    vote_average FLOAT,
    overview TEXT,
    adult BOOLEAN,
    backdrop_path VARCHAR(255),
    first_air_date DATE,
    last_air_date DATE,
    homepage VARCHAR(255),
    //in_production BOOLEAN,
    //original_name VARCHAR(255),
    popularity FLOAT,
    poster_path VARCHAR(255),
    //type VARCHAR(50),
    //status VARCHAR(50),
    tagline TEXT,
    genres TEXT[], -- Array of genres, adjust type accordingly
    created_by TEXT[], -- Array of creators, adjust type accordingly
    //languages TEXT[], -- Array of languages, adjust type accordingly
    networks TEXT[], -- Array of networks, adjust type accordingly
    //origin_country VARCHAR(10),
    //spoken_languages TEXT[], -- Array of spoken languages, adjust type accordingly
    //production_companies TEXT[], -- Array of production companies, adjust type accordingly
    //production_countries TEXT[], -- Array of production countries, adjust type accordingly
    episode_run_time INT[] -- Array of episode run times, adjust type accordingly
);

const express = require("express");

const movieRouter = express.Router();
const { createMovie,
    getAllMovies,
    getMovieById,
    getMovieByTitle,
    getMovieByGenre,
    getMovieByYear,
    updateMovie,
    deleteMovie, } = require("../controllers/movie.controller");

// Ruta para crear un nuevo movie
movieRouter.post("/", createMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.get("/title/:title", getMovieByTitle);
movieRouter.get("/genre/:genre", getMovieByGenre);
movieRouter.get("/year/:year", getMovieByYear);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

module.exports = movieRouter;
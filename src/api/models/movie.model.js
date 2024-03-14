const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
    },
  year: {
    type: Number,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true, // Sirve para que no se queden los espacios en blanco
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

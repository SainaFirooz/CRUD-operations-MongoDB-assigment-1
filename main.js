import mongoose from "mongoose";
import inquirer from "inquirer";

const movieSchema = mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genres: { type: [String], default: [] },
    ratings: { type: [Number], default: [] },
    cast: { type: [String], default: [] },
});

const movieModel = mongoose.model("Movies", movieSchema);
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

const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/saina-assignment1");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

const closeDBConnection = async () => {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        console.error("Error disconnecting from MongoDB", error);
    }
}
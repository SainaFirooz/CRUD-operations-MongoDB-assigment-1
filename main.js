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
};

const menu = async () => {
  try {
    while (true) {
      const { choice } = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          message: "Menu",
          choices: [
            "View all movies",
            "Add a new movies",
            "Update a movie",
            "Delete a movie",
            "Exit",
          ],
        },
      ]);
      switch (choice) {
        case "View all movies":
          await viewAllMovies();
          break;
        case "Add a new movies":
          await addNewMovie();
          break;
        case "Update a movie":
          await updateMovie();
          break;
        case "Delete a movie":
          await deleteMovie();
          break;
        case "Exit":
          await closeDBConnection();
          return;
      }
    }
  } catch (error) {
    console.error("Error", error);
  }
};


const viewAllMovies = async () => {
    try {
      const allMovies = await movieModel.find({});
      console.log("All Movies", allMovies);
    } catch (error) {
      console.error("Error showing all movies", error);
    }
};
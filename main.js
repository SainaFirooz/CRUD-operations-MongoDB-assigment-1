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

const addNewMovie = async () => {
    try {
      const newMovie = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the movie: ",
        },
        {
          type: "input",
          name: "director",
          message: "Enter the director of the movie:",
        },
        {
          type: "input",
          name: "releaseYear",
          message: "Enter the release year of the movie:",
        },
        {
          type: "input",
          name: "genres",
          message: "Enter the genres of the movie (comma separated): ",
          filter: (input) => input.split(",").map((genre) => genre.trim()),
        },
        {
          type: "input",
          name: "ratings",
          message: "Enter the ratings of the movie (comma separated): ",
          filter: (input) => input.split(",").map((rating) => parseFloat(rating.trim())),
        },
        {
          type: "input",
          name: "cast",
          message: "Enter the cast of the movie (comma separated): ",
          filter: (input) => input.split(",").map((cast) => cast.trim()),
        },
      ]);
      const movie = new movieModel(newMovie);
      await movie.save();
      console.log("New movie added to the database: ", movie);
    } catch (error) {
      console.error("Error adding new movie", error);
    }
};

const updateMovie = async () => {
    try {
        const { title } = await inquirer.prompt([
            { type: "input", name: "title", message: "Enter movie title to update: "},
        ]);
        const movie = await movieModel.findOne({ title });
        if (!movie) {
            console.log("Movie not found.");
            return;
        }

        const fields =  ["director", "releaseYear", "genres", "ratings", "cast"];
        const prompts = fields.map((field) => ({
            type: "input",
            name: field,
            message: `Enter updated ${field} (leave empty to keep unchanged, comma separated):`,
            default: movie[field],
        }));

        const answers = await inquirer.prompt(prompts);

        Object.assign(movie, answers);

        await movie.save();
        console.log("Movie updated successfully.");
    } catch (error) {
        console.error("Error updating movie: ", error);
    }
      
};
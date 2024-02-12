import mongoose, { connect } from "mongoose";

const uri = "mongodb://127.0.0.1:27017/saina-assignment1"

async function main() {
    try {
        await mongoose.connect(uri);
        console.log("Conneceted to MongoDB");

        
        const movieSchema = mongoose.Schema({
            title: { type: String },
            director: { type: String },
            releaseYear: { type: Number },
            genres: { type: [String] },
            ratings: { type: [Number] },
            cast: { type: [String] },
        });

        const movieModel = mongoose.model("Movies", movieSchema);

    }
};
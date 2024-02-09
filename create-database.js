import mongoose, {connect} from "mongoose";

const con = await connect("mongodb://127.0.0.1:27017/saina-assignment1");
const {db} = mongoose.connection;

const movieSchema = mongoose.Schema(
    {
        title: {type: String},
        director: {type: String},
        releaseYear: {type: Number},
        genres: {type: [String]},
        ratings: {type: [Number]},
        cast: {type: [String]}
    }
);

const movieModel = mongoose.model("Movie", movieSchema);

const movieCol = await db.createCollection(movieModel);



mongoose.connection.close();

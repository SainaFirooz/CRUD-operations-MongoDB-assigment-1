import mongoose, {connect} from "mongoose";

await connect("mongodb://127.0.0.1:27017/saina-assignment1");
const {db} = mongoose.connection;


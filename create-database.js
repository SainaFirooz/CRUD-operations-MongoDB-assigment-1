import mongoose, { connect } from "mongoose";

const uri = "mongodb://127.0.0.1:27017/saina-assignment1"

async function main() {
    try {
        await mongoose.connect(uri);
        console.log("Conneceted to MongoDB");

    }
}
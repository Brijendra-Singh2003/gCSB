const mongoose = require("mongoose");

exports.connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO}?retryWrites=true&w=majority`);
    } catch (err) {
        console.log("error while connecting to mongoDB: ", err);
    }
};

mongoose.connection.once("open", () => {
    console.log("connected to database");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

process.on("SIGINT", async () => {
    try {
        await mongoose.connection.close();
        console.log("connection closed");
    } catch (error) {
        console.log("error while closing connection: ", error);
    }
});
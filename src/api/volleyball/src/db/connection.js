const mongoose = require("mongoose");

exports.connectToDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO}?retryWrites=true&w=majority`);
    } catch (err) {
        console.error(err);
    }
};

mongoose.connection.once("open", () => {
    console.log("connected to database");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

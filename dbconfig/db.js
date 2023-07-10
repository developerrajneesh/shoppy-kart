const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose
    .connect("mongodb+srv://developerrajneeshshukla:7Ys9BmQACb1nVjed@cluster0.5gxkrnb.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to mongoose");
    })
    .catch((err) => {
      console.log(err);
      console.log("Not conected to the database");
    });
};

module.exports = connectToMongo;
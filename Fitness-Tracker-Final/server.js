const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const exerciseRoutes = require("./routes/exercises");
// const workoutRoutes = require("./routes/workouts");
const apiRoutes = require("./routes/api");
const viewRoutes = require("./routes/html");

const app = express();
const PORT = process.env.PORT || 3001;


mongoose.connect(
  process.env.MONGODB_URI || 
  "mongodb://user1:password1@ds157057.mlab.com:57057/heroku_k4j2gkgv",
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(apiRoutes);
app.use(viewRoutes);
// app.use(workoutRoutes);  

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => console.log("listening on port: ", PORT));
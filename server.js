// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001;
//const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("public")); // Might need to change "public" to "client/build" later
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/FIND_A_JOB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Codes used to test connection to server by adding to users collection in FIND_A_JOB DB
// const userSchema = new mongoose.Schema ({
//   username: String,
//   password: String,
//   job: String
// })

// const Users = mongoose.model("Users", userSchema);

// const user = new Users ({
//   username: "Wesaboo",
//   password: "sumhash",
//   job: "Web Developer"
// })
//user.save();

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

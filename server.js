const fs = require('fs');
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const notes = require("./Develop/db/db.json");

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/db/db.json'));
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// // Use apiRoutes
// app.use('./routes/apiRoutes', apiRoutes);
// app.use('./routes/htmlRoutes', htmlRoutes);

// getting homepage to display
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// getting notes page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

// listening to requests
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

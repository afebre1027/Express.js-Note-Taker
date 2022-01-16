const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const { notes } = require("./Develop/db/db.json");

app.get("/api/db", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/db/db.json"));
});

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));

// // Use apiRoutes
// app.use('./routes/apiRoutes', apiRoutes);
// app.use('./routes/htmlRoutes', htmlRoutes);

// function findById(id, notesArray) {
//   const result = notesArray.filter((note) => note.id === id)[0];
//   return result;
// }

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./Develop/db/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

// app.get("/api/notes/:id", (req, res) => {
//   const result = findById(req.params.id, notes);
//   if (result) {
//     res.json(result);
//   } else {
//     res.send(404);
//   }
// });

// getting homepage to display
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

// getting notes page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.post("/api/db", (req, res) => {
  // req.body is where our incoming content will be stored
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  const note = createNewNote(req.body, notes);
  res.json(note);
});

// listening to requests
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

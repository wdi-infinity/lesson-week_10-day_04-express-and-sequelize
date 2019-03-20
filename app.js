import express from "express";
import models from "./models";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello WDI-Infinity!" });
});

// const PEOPLE = [
//   { firstName: "Ayman", lastName: "Faisal" },
//   { firstName: "Abdullah", lastName: "Alfehaid" },
//   { firstName: "Yasser", lastName: "Faisal" }
// ];

app.get("/api/people", (req, res) => {
  models.Person.findAll()
    .then(people => {
      res.status(200).json({ people: people });
    })
    .catch(e => console.log(e));
});

app.get("/api/person/:id", (req, res) => {
  let id = req.params.id;
  if (!isNaN(id)) {
    models.Person.findByPk(req.params.id)
      .then(person => {
        if (person) res.status(200).json({ person: person });
        else res.status(404).json({ error: "Person Not Found!!!" });
      })
      .catch(e => console.log(e));
  } else {
    res.status(406).json({ error: "Invalid ID!!!" });
  }
});

// app.get("/api/person/:id", (req, res) => {
//   res.status(200).json({
//     message: "Working"
//   });
// });

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`express-api app listening on port ${PORT}`)
);

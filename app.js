import express from "express";
import models from "./models";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes ****

// Root path
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello WDI-Infinity!" });
});

// Get all people
app.get("/api/people", (req, res) => {
  models.Person.findAll()
    .then(people => {
      res.status(200).json({ people: people });
    })
    .catch(e => console.log(e));
});

// Get person by Record ID
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

// Create a new Person
app.post("/api/person", (req, res) => {
  models.Person.create(req.body)
    .then(newPerson => {
      res.status(200).json({ person: newPerson });
    })
    .catch(e => console.log(e));
});

// Delete a Person
// app.delete("/api/person/:id", (req, res) => {
//   const ID = req.params.id;

//   models.Person.destroy({
//     where: { id: ID }
//   })
//     .then(person => {
//       res.status(200).json({
//         message: `${person} person deleted successfully`
//       });
//     })
//     .catch(e => console.log(e));
// });

// Delete a Person
app.delete("/api/person/:id", (req, res) => {
  const ID = req.params.id;
  models.Person.findByPk(ID).then(person => {
    if (person) {
      person
        .destroy()
        .then(() => {
          res.status(200).json({
            message: `${person.first_name} deleted successfully`
          });
        })
        .catch(e => console.log(e));
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });
});

// Update a person
// app.put("/api/person/:id", (req, res) => {
//   const ID = req.params.id;
//   models.Person.update(
//     { first_name: req.body.first_name, last_name: req.body.last_name },
//     { where: { id: ID } }
//   )
//     .then(r => {
//       res.status(200).json({ message: `${r} updated successfully` });
//     })
//     .catch(e => console.log(e));
// });

// Update a person
app.put("/api/person/:id", (req, res) => {
  const ID = req.params.id;
  models.Person.findByPk(ID).then(person => {
    if (person) {
      person
        .update({
          first_name: req.body.first_name,
          last_name: req.body.last_name
        })
        .then(() => {
          res.status(200).json({
            message: `${person.first_name} updated successfully`
          });
        })
        .catch(e => console.log(e));
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`express-api app listening on port ${PORT}`)
);

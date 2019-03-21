import express from "express";
import models from "./models";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

/*** MiddleWare ***/
app.use(bodyParser.json());

/*** Routes ***/

//Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello WDI-Infinity!" });
});

//to get all the data about people
app.get("/api/people", (req, res) => {
  models.Person.findAll()
    .then(people => {
      res.status(200).json({
        //the first people is just the key, so it's changable but not the second one.
        people: people
      });
    })
    .catch(e => console.log(e));
});

//to get a specifc person data
app.get("/api/person/:id", (req, res) => {
  // did this line just to test if this command is working
  // res.status(200).json({message: 'working...'});
  // did this line if the *id* is working
  // res.status(200).json({user_id: req.params.id});
  if (isNaN(req.params.id) === false) {
    models.Person.findByPk(req.params.id)
      .then(person => {
        if (person !== null) {
          res.status(200).json({ person: person });
        } else {
          res.status(404).json({ error: "Person is not found" });
        }
      })
      .catch(e => console.log(e));
  } else {
    res.status(406).json({ error: "Invalid ID" });
  }
});
// create new person data
app.post("/api/person", (req, res) => {
  models.Person.create(req.body)
    .then(person => {
      //implment validations and conditions to increase the safety of the product.
      res.status(201).json({ person: person });
    })
    .catch(e => console.log(e));
});
//to update the person data
app.put("/api/person/:id", (req, res) => {
  // find Person by ID sent to us by user in the URL
  models.Person.findByPk(req.params.id)
    .then(person => {
      //call the update function on the person the database sent us back
      //Only update the fields I care about.
      person
        .update({
          first_name: req.body.first_name,
          last_name: req.body.last_name
        })
        .then(person => {
          //THe database was able to update the user
          // And it sent us back an updated Record with the new information
          // We can now send back this new information to the user
          res.status(200).json({ person: person });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});
//to delete a person data.
app.delete("/api/person/:id", (req, res) => {
  models.Person.findByPk(req.params.id)
    .then(person => {
      person.destroy().then(() => {
        res.status(200).json({
          result: `Record ID ${req.params.id} is deleted`
        });
      });
    })
    .catch(e => console.log(e));
});
app.listen(port, () => console.log(`working on port ${port}`));

import express from 'express';
import bodyParser from 'body-parser';
import models from './models';

const app = express();
const port = 3000;

/** **  Middleware  *****/
app.use(bodyParser.json());

/****  routes  **** */

// Root Path
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello WDI-Infinity!',
  });
});

// Get All people
app.get('/api/people', (req, res) => {
  models.Person.findAll()
    .then((peopleFromDB) => {
      res.status(200).json({
        people: peopleFromDB,
      });
    })
    .catch(e => console.log(e));
});

// get person Record ID
app.get('/api/person/:id', (req, res) => {
  if (!isNaN(req.params.id)) {
    models.Person.findByPk(req.params.id)

      .then((person) => {
        if (person !== null) {
          res.status(200).json({ person });
        } else {
          res.status(416).json({ message: 'person not found' });
        }
      })
      .catch(e => console.log(e));
  } else {
    res.status(406).json({ error: 'onvilde ID' });
  }
});

app.post('/api/person', (req, res) => {
  models.Person.create(req.body)
    .then((personNewFromDB) => {
      res.status(201).json({
        perosn: personNewFromDB,
      });
    })
    .catch(e => console.log(e));
});


// app.delete('/api/person/:id', (req, res) => {
//   const id = req.params.id;
//     .then((personDeleteFromDB)=>{
//     people.splice(id, 1);
//   res.status(204).send();
// });
// app.delete('/api/person/:id', (req, res) => {
//   const id = req.params.id;
//   people.splice(id, 1);
//   res.status(204).send();
//  });



app.listen(port, () => {
  console.log(`.:|:|:|:|:|express-api app Server started on ${port}|:|:|:|:.`);
});

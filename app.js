import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
const app = express();
const port=3000;
/*** Middleware ***/

app.use(bodyParser.json());
// localhost: 3000/
/** Routes path */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello WDI-Infinity!',
  });
});

// const people = [
//   { firstName: 'alia', lastName: 'alrashidi' },
//   { firstName: 'usman', lastName: 'bashir' },
//   { firstName: 'ghdeer', lastName: 'alkhathlan' },
//   { firstName: 'michael', lastName: 'finneran' },
//   { firstName: 'fajer', lastName: 'albakiri' },
// ];


//post http://localhost:3000/api/person/:id'  get person by record id 
app.get('/api/person/:id', (req, res) => {
  // res.status(200).json({user_id:'Working...'});
  if(!isNaN(req.params.id)){
    models.Person.findByPk(req.params.id)
    .then(person => {
      if (person!==null)
      {  res.status(200).json({person: person});
      }else{
        res.status(404).json({error: 'person not found'});
      }
    })
    .catch(e => console.log(e)); 
  }else{
    res.status(406).json({error: "invalid ID"});
  }
  
  });
// create new person
  app.post('/api/person/', (req, res) => {
    models.Person.create(req.body)
    .then(personNewFromDB => {
    res.status(201).json({person: personNewFromDB});
    })
    .catch(e => console.log(e))
    
  });

  
// localhost: 3000/api/people get all people
app.get('/api/people', (req, res) => {
  models.Person.findAll()
  .then(people => {
    res.status(200).json({
      people: people,
    });
  })
  .catch(e => console.log(e)); 
});
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`express-api app listening on port ${port}!`));

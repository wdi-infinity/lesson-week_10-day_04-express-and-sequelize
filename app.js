import express from 'express';
import models from './models';
import bodyParser from 'body-parser';


const app = express();


///middleware////

app.use(bodyParser.json());



/// routes ///

///route path ///
app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})

///get all people ///
app.get('/api/people',(req,res)=>{
   models.Person.findAll()
   .then(peopleFromDB =>{
    
    res.status(200).json({
        people: peopleFromDB
   })
   .catch(e=> console.log(e));

    });
});

/// get person by record ID ////
app.get('/api/person/:id', (req, res) => {
    if( !isNaN(req.params.id) ) {
      models.Person.findByPk(req.params.id)
      .then(person => {
        if(person !== null) {
          res.status(200).json({ person: person });
        } else {
          res.status(404).json({ error: 'Person Not Found' });
        }
      })
      .catch(e => console.log(e));
    } else {
      res.status(406).json({ error: 'Invalid ID' });
    }
  });



 app.post('/api/person', (req,res)=>{
    models.Person.create(req.body)

    .then(personNewFromDB => {

     res.status(201).json({person:personNewFromDB})
    })
    .catch(e => console.log(e));
 });




const PORT = 3000;

app.listen(PORT, () => {
  console.log("server running on port"+PORT)
});
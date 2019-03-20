import express from 'express';
import models from './models';
const app = express();
const port =3000;
app.get ('/',(req,res)=>{
res.status(200).json({
message: "Hello WDI-Infinity!"
});

});



// const people = [
// {firstName:'Waad',lastName:'Baabdullah'},
// {firstName:'Asma',lastName:'Baabdullah'},
// {firstName:'Afrah',lastName:'Baabdullah'},
// {firstName:'Samah',lastName:'Baabdullah'},
// {firstName:'Tahani',lastName:'Baabdullah'},
// {firstName:'khalid',lastName:'Baabdullah'},
// {firstName:'Mohammad',lastName:'Baabdullah'}
// ];


//new route
//localhost:3000
//localhost:3000/api/people api is a convention
//each apis must come after localhost:3000/api/ is the best way  
app.get('/api/people', (req, res) => {
    models.Person.findAll()
    //read data from database
      .then(peopleFromDB => {
        res.status(200).json({
          people: peopleFromDB
        });
      })
      .catch(e => console.log(e));
  });


//http://localhost:3000/api/person/2
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
//res.status(200).json({user_id: req.params.id});













app.listen(port,()=>console.log(`express-api app listening on port ${port}!`));
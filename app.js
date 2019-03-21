//you have to add this by yourself
import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port =3000;
/**Middleware */
app.use(bodyParser.json());



//Routes

//Root Path
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


//Get All people
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

//Get person by Recored ID
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


//post
//no need for id cause the db will do it for me
app.post('/api/person',(req,res) =>  {
    models.Person.create(req.body)
    .then(personNewFromDB => {
        res.status(201).json({ person:personNewFromDB });

    })
    .catch(e => console.log(e));

});


//To update
app.put('/api/person/:id', (req, res) => {
    if( !isNaN(req.params.id) ) {
        models.Person.findByPk(req.params.id)
        models.Person.create(req.body)
        .then(personNewFromDB => {
          if(person !== null) {
            res.status(200).json({ person: personNewFromDB });
          } else {
            res.status(404).json({ error: 'Person Not Found' });
          }
        })
        .catch(e => console.log(e));
      } else {
        res.status(406).json({ error: 'Invalid ID' });
      }
    });

//To delete exiting Person by record Id 
//find the record first
//then delete it 
app.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
    //person is reference to the record
    .then(person => {
        person.destroy()
        .then(()=>{res.status(200).json({
            result:`Record ID ${req.params.id} Deleted`,
            success: true
        });
        
    })
    .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});





app.listen(port,()=>console.log(`express-api app listening on port ${port}!`));
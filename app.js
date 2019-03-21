import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const PORT = 3000;
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


//create new record
 app.post('/api/person', (req,res)=>{
    models.Person.create(req.body)

    .then(personNewFromDB => {

     res.status(201).json({person:personNewFromDB})
    })
    .catch(e => console.log(e));
 });


// //update 

// app.put('/api/person/:id',(req,res)=> {
// const id =  models.Person.findByPk(req.params.id)
// const person = req.body.person;
// models.Person[id]=person;
//  res.status(201).json({person:person})

// });




app.delete('/api/person/:id',(req,res)=> {

    
    models.Person.destroy({
        where: {id: req.params.id }
    })
  .then(person => {
    res.status(201).json({message: "sucsess"})
  })
  .catch(e => console.log(e));

});




app.listen(PORT, () => {
  console.log("server running on port"+PORT)
});
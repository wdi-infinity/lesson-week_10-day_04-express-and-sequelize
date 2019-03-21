import express from 'express';
import models from './models';
import { runInNewContext } from 'vm';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

/* Middleware */

app.use(bodyParser.json());


/** routes **/

//Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    });
});

//Get all people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
    .then(peopleFromDb => {
        res.status(200).json({
            people: peopleFromDb
            });
    })
    .catch(e => console.log(e));
   
});

//Get person by Record ID
app.get('/api/person/:id', (req, res) =>{
    if(!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
    .then(person => {
        if(person !== null){
        res.status(200).json({ person: person });
        } else {
            res.status(404).json({ error: 'Person Not Found'})
        }
    })
    .catch(e => console.log(e));
}else{
    res.status(406).json({error: 'Invalid ID'});
}
});

// Create new person
app.post('/api/person', (req, res) =>{
    models.Person.create(req.body)
    .then(personNewFromDB => {
        res.status(201).json({
            perosn: personNewFromDB
        });
    })
    .catch(e => console.log(e))
    
});

// Update an existing Person
app.put('/api/person/:id', (req, res) => {
   models.Person.update(req.params.id)
   .then(person =>{
       res.status(201).json({
           person: person
       });
    })
       .catch(e => console.log(e))
   });

// app.update('/api/person/:id', (req, res) => {
    
//     models.Person.update(
//         {person: req.body.id},
//         { where: {id: person.id}})
//         .then(person => {
//             res.status(200).json({ person: person });
//         })
//         .catch(e => console.log(e))
// });
 
//Delete an existing Person
app.delete('/api/person/id', (req, res) => {
    const id = req.params.id;
    const person = req.body.perosn
    person.splice(id, 1);
    res.status(204).send();
    })


app.listen(port, () => console.log(`express-api and listening on port ${port}!`));
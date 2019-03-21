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
    //Find person bu ID sent to us by user in URL
   models.Person.findByPk(req.params.id)
   .then(person => {
       // Call the update function on the person the database sent us back
       // Only update the field I care about
       person.update({
           first_name: req.body.first_name,
           last_name: req.body.last_name
    }).then(person => {

    // the database was able to update the user
    // And is sent us back an update record with the new information
        res.status(200).json({person: person});
    }).catch(e => console.log(e))
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
app.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
    .then(person => {
       person.destroy()
         .then(() => {
         res.status(200).json({
         result: `Record ID ${req.params.id} Deleted`,
         success: true
        })
      })
      .catch(e => console.log(e))
     })
     .catch(e => console.log(e))
})

app.get('/api/articles', (req, res) => {
models.Article.findAll().then(articles => {
res.status(200).json({articles: articles});
}).catch(e => console.log(e))
})


app.listen(port, () => console.log(`express-api and listening on port ${port}!`));
import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;


/*** Middleware   */
app.use(bodyParser.json());


app.get('/', (req, res) => {
res.status(200).json({
    message: 'Hello WDI-Infinity'
});
});



app.get('/api/people', (req, res) => {
    models.Person.findAll()
    .then(people => {
        res.status(200).json({
            people: people  // people from DB the 2nd one the 1nd is key of object 
        });
    })
        .catch(e => console.log(e)); 
});



app.get('/api/person/:id', (req, res) => {
    if( !isNaN(req.params.id) )
    models.Person.findByPk(req.params.id)
    .then(person => {
        if(person !== null ){
            res.status(200).json({person: person})
        } else {

            res.status(406).json({ error : 'Person Not Found'})          
        } 
    })
    .catch(e => console.log(e)); 
else {
    res.status(200).json({ erroe: 'Invalid ID' })
}
});






app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
    .then(personNewFromDB => { 
res.status(201).json({ person: personNewFromDB });
    })
    .catch(e => console.log(e)); 
});






app.put('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
     .then(person => {
            person.update({ first_name: req.body.first_name, last_name: req.body.last_name}).then()(person => {
                res.status(201).json({ person: person })
                .catch(e => console.log(e)); 
            })     
     })
     .catch(e => console.log(e)); 
    });





    app.delete('/api/person/:id', (req, res) => {
        const id = req.params.id
        models.Person.findByPk(id)
          .then(person => {
            person.destroy().then(() => {
              res.status(200).json({
                result: `Record ID ${id} Deleted`,
                success: true
              });
            })
            .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      });
app.listen(port, () => console.log(`express-api app listening on port ${port}`));

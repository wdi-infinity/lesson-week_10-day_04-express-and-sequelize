import express from 'express';
import models from './models'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

/*** MiddleWare ***/

app.use(bodyParser.json());



/*** Routes ***/

//localhost:3000
app.get('/',(req , res) => {
res.status(200).json({ message: 'Hello WDI-Infinty!' })
});

//localhost:3000/api/people display all list
app.get('/api/people' , (req , res ) => {
    //Find all people
    models.Person.findAll()
    .then(people => {
        res.status(200).json({
            //display array of people
            people: people
          })
    })
    .catch( e => console.log(e))
  
})

//localhost:3000/api/person/:id to Find one person at a time
app.get('/api/person/:id' , (req , res ) => {

    const id = req.params.id
    if(!isNaN(id)){
    models.Person.findByPk(id)//One person

    .then(person => {
        if (person !== null){
        res.status(200).json({  person: person  })
        }
        else {
            res.status(404).json({  error: 'Person Not Found'  })
        }
    })
    .catch( e => console.log(e))
}
else {
    res.status(406).json({  error: 'Invalid ID'  })
}
})

//localhost:3000/api/person to Add one person at a time
app.post('/api/person' , (req , res) => {
    const person = req.body
    models.Person.create(person)
    .then( personNewFromDb => {
        res.status(201).json({person: personNewFromDb})
    })
    .catch( e => console.log(e))
  
})

//localhost:3000/api/person/:id to Update person at a time
app.put('/api/person/:id' , (req , res) => {
   
    const id = req.params.id
    models.Person.findByPk(id)
    .then( person => {
        person.update({ id: req.body.id ,first_name: req.body.first_name , last_name: req.body.last_name

                     }) 

        // person.update(req.body) 
        res.status(201).json({person: person})
    })
    .catch( e => console.log(e))
  
})

//localhost:3000/api/person/:id to Delete person at a time


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

app.listen(port, ()=> console.log(`express-api listening on port ${port}`));
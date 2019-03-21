import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

/*** Middleware ***/

app.use(bodyParser.json());


/*** Routes ***/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

// const peopleList = [
//   { firstName: 'Usman', lastName: 'Bashir' },
//   { firstName: 'Michael', lastName: 'Finneran' },
//   { firstName: 'Ghadeer', lastName: 'Alkhathlan' },
//   { firstName: 'Saja', lastName: 'Algadhi' },
//   { firstName: 'Hussah', lastName: 'Alakeel' },
//   { firstName: 'Ahmad', lastName: 'Alqahtani' },
//   { firstName: 'Abdullah', lastName: 'Alfehaid' }
// ];


// Get all people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e));
});



//Get person by Record ID
app.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {

        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                } else {
                    res.status(404).json({ error: 'Person Not Found' });
                }
            })

        
    .catch(e=> console.log(e));
        }else{
            res.status(406).json({error: "Invalid ID"});

        }
});

//Create new person 
app.post('/api/person', ( req, res)=>{
    models.Person.create(req.body)
    .then(personNewFromDB =>{
        res.status(201).json({ person: personNewFromDB });
    })
    .catch(e => console.log(e));
})

//update person
app.post('/api/person/:id', (req, res) => {
    models.Person.update(req.body)
        .then(personUpdateFromDB => {
            res.status(201).json({ person: personUpdateFromDB });
        })
        .catch(e => console.log(e));
})


app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
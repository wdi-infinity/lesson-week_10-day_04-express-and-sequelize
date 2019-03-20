import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import { create } from 'domain';

const app = express();
const port = 3000;

// MiddleWare
app.use(bodyParser.json());

// Routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI'
    });
});


// Get All people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e))
});


// Get person by Record ID
app.get('/api/person/:id', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                }
                else {
                    res.status(404).json({
                        error: 'person not found'
                    });
                }
            })
            .catch(e => console.log(e))
    }
    else {
        res.status(406).json({ error: 'Invalid ID' })
    }
})


// create new person
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDBB => {
            res.status(201).json({ person: personNewFromDBB });
        })
        .catch(e => console.log(e));
})

//Update a person


//Delete a person

app.listen(port, () => console.log(`express-api app listeing on port ${port}!`))
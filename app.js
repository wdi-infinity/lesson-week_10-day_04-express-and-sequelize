import express from 'express';
import models from './models';
import bodyParser from 'body-parser'

const app = express();
const port = 3000

// Middleware
app.use(bodyParser.json())

/***  Routes ***/

// Route path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})
// Get All people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            })
        })
        .catch(e => console.log(e))
})

// Get person by record id
app.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person })
                } else {
                    res.status(404).json({ error: "person not found" })
                }
            })
            .catch(e => console.log(e))
    } else {
        res.status(418).json({ error: 'Invalid ID' })
    }
})

// Create new person
app.post("/api/person", (req, res) => {
    const person = req.body
    models.Person.create(person)
        .then(persondb => {
            res.status(200).json({ person: persondb })
        })
        .catch(e => console.log(e))
})

// Delete Person by Record ID
app.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(() => {
                res.status(200).send("Deleted successfully");
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});

// Update Person
app.put('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.update(req.body.person)
                .then(person => {
                    res.status(200).json({ person: person });
                }).catch(e => console.log(e));

        }).catch(e => console.log(e));
});
app.listen(port, () => console.log(`express-api listening on port ${port}!`))
import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

/*** Middleware ***/

app.use(bodyParser.json());

//root path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})

// Gets all people
app.get('/api/people', (req, res) => {

    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e));
});

// Get Person by ID
app.get('/api/person/:id', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(personFromDB => {

                if (personFromDB !== null) {
                    res.status(200).json({ person: personFromDB });
                } else {
                    res.status(404).json({ message: "person NOT found" });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID" });
    }

});

// Create New persone
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB })
        })
        .catch(e => console.log(e));
});

// Delete Person by ID
app.delete('/api/person/:id', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(personFromDB => {

                if (personFromDB !== null) {

                    personFromDB.destroy()
                        .then(() => {
                            res.status(200).json({ result: `Recourd ID ${req.params.id} Deleted`, success: true });
                        })
                        .catch(e => console.log(e));

                } else {
                    res.status(404).json({ message: "person NOT found" });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID" });
    }

});

// Update an existing Person
app.put('/api/person/:id', (req, res) => {
    // Find Person By ID sent to us by User in the URL
    models.Person.findByPk(req.params.id).then(person => {
        // Call the Update function on the Person the database sent us back.
        // Only update the fields I care about.
        person.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }).then(person => {
            // The database was able to update the user
            // And it sent us back an updated Record with the new information
            // We can now send back this new information to the user
            res.status(200).json({ person: person });
        }).catch(e => console.log(e));

    }).catch(e => console.log(e));
});

const people = [
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' }
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
})

app.listen(port, () => console.log(`express-api listening on port ${port}!`))
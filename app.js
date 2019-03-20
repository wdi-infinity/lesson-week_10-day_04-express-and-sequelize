import express from 'express';
import models from './models';

const app = express();
const port = 3000;

app.get('/api/people', (req, res) => {

    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e));
});

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
import express from 'express';
import models from './models';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
});

// const people = [
//     { firstName: 'Rawan', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan1', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan2', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan3', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan4', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan5', lastName: 'Alahmmadi' }
// ]

app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            });
        })
        .catch(e => console.log(e));

});
app.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                }
                else {
                    res.status(404).json({ error: 'Person Not Found' });
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }

});



app.listen(3000, () => console.log(`express-api listening on port ${port}!`))
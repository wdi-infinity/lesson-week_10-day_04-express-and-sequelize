import express from 'express';
import models from './models';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI'
    });
});



app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e))
});


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
app.listen(port, () => console.log(`express-api app listeing on port ${port}!`))
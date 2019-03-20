import express from 'express';
import models from './models'
import bodyParser from 'body-parser'
const app = express();
const port = 3000;


/***middleware***/
app.use(bodyParser.json());
/***Routes***/
//Root Path
app.get('/', (req, res) => {

    res.status(200).json({

        message: 'Hello WDI-Infinity!'
    });


});
// const peopleList = [
//     { firstName: 'Saja', lastName: 'ALi' },
//     { firstName: 'Anfal', lastName: 'jafrai' },
//     { firstName: 'Ghadeer', lastName: 'ALkhathlan' },
//     { firstName: 'Me', lastName: 'Me' },
//     { firstName: 'Usman', lastName: 'Bashir' },];


// Get ALl People
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
                    res.status(404).json({ error: 'Person is Not Found' })
                }

            })
            .catch(e => console.log(e));
    } else {

        res.status(406).json({ error: 'Invalid ID' });
    }

});
//Create New Person
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB });
        })
        .catch(e => console.log(e));




});
//localhost:3000
//localhost:3000/api/people

app.listen(port, () => console.log(`express-api app listninig on port ${port}!`));
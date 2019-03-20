import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import { read } from 'fs';

//declear bath route
const app = express();
const port = 3000;

/****Middleware ****/
app.use(bodyParser.json());


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
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});

//
app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
});

//create new person 
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB });

        }
        )
        .catch(e => console.log(e));

});

//const peopleList = [
// { firstName: 'Nahed', lastName: "Hawsawi" },
//  { firstName: 'Jone', lastName: "Jak" },
//  { firstName: 'Nahed', lastName: "Hawsawi" },
// { firstName: 'jamal', lastName: "hamed" },
// { firstName: 'jaswer', lastName: "nawras" }

// ]

app.listen(3000, () => console.log(`express-api app listening on port 3000!${port}!`))

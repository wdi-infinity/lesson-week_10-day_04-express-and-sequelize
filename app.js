import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
/* middleware */

app.use(bodyParser.json());

/* Routes*/

//Root Path
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

//Get all people
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

app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(person => {
            res.status(201).json({ person: person });
        })
        .catch(e => console.log(e));
});

// My solution
// app.delete('/api/person/:id', (req, res) => {
//     if (!isNaN(req.params.id)) {
//         models.Person.destroy({
//             where: { id: req.params.id }
//         })
//             .then(person => {
//                 res.status(201).json({ person: person });
//             })
//             .catch(e => console.log(e));
//     } else {
//         res.status(406).json({ error: 'Invalid ID' });
//     }
// });


//Usman solution
app.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(() => {
                res.status(201).json({ result: `Record ID ${req.params.id} deleted` });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

});


//My solution 
app.patch('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.update({ first_name: "Rawan9", last_name: "Alahmadi" }, { where: { id: req.params.id } }
        )
            .then(person => {

                res.status(201).json({ person: person });
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});



//Usman solution 
app.put('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name
            }).then((person) => {
                res.status(200).json({ person: person });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

});

app.listen(3000, () => console.log(`express-api listening on port ${port}!`))
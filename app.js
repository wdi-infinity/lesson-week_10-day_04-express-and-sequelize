import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


// Middleware 
app.use(bodyParser.json());


//  routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello ppl !"
    });
});

// new routre
// app.get('/api/people', (req, res) => {
//     res.status(200).json({
//         message: "API/PEOPLE Works!"
//     });
// });

// Get All People 
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            });
        })
        .catch(e => console.log(e))
});
// Gets Person By Record ID
app.get('/api/person/:id', (req, res) => {

    //    To test 
    // res.status(200).json({ message: 'Working Perfectly' })
    // To test if id is working 
    // res.status(200).json({ user_id: req.params.id })
    // We need only Numbers as an IDs ! so we added a condition 
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                } else {
                    res.status(404).json({ error: "Person Not found " });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID " });
    }
});


// Create new person 
app.post('/api/person', (req, res) => {
    // add data to db 
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json(({ person: personNewFromDB }))
        })
        .catch(e => console.log(e));
});

// localhost:3000/people.html 
//  localhost:3000/api/people
// 



// HW:

// Delete
app.delete('/api/person/:id', (req, res) => {
    // I need to find a person by ID
    models.Person.findByPk(req.params.id)
        // person object -> holds a refrence of a person from sequlize   
        .then(person => {
            person.destroy().then(() => {
                res.status(200).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});


// update 
app.put('/person/:id', (req, res) => {
    const id = req.params.id
    person[id] = person;
    res.status(200).json({ person: person });
});


app.listen(port, () => console.log(`express-api listening on port ${port}`))


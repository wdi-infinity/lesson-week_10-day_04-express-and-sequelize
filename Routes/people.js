import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();
router.use(bodyParser.json());

// Get All people
router.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e))
});

// Get person by Record ID
router.get('/api/person/:id', (req, res) => {

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
router.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDBB => {
            res.status(201).json({ person: personNewFromDBB });
        })
        .catch(e => console.log(e));
})

//Update a person
router.put('/api/person/:id', (req, res) => {
    //find  Person by ID that sent to us bu user in the URL
    models.Person.findByPk(req.params.id)
        //call the update function on the person that database sent to us
        //only updae the fields i care about
        .then(person => {
            person.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })
                .then(person => {
                    //the database was able to update the user
                    //
                    res.status(200).json({ person: person })
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
});

//Delete a person
router.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy()
                .then(() => {
                    res.status(200).json({
                        result: `Record ID ${req.params.id} Deleted`,
                        success: true
                    })
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
})

export default router;

import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();

router.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {


            res.status(200).json({

                people: peopleFromDB

            });


        })
        .catch(e => console.log(e));




});
//Get person by Record ID
router.get('/api/person/:id', (req, res) => {
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
router.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB });
        })
        .catch(e => console.log(e));




});
//Delete Person

// router.delete('/api/person/:id', (req, res) => {
//     models.Person.destroy(req.params.id)
//         .then(deletedperson => {
//             res.status(200).json({ person: deletedperson });
//         })
//         .catch(e => console.log(e));
// });
// Update an existing Person
http://localhost:3000/api/person/533
router.put('/api/person/:id', (req, res) => {
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

// DELETE single person
router.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(() => {
                res.status(201).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

});


export default router;
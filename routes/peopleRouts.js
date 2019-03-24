import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';

const router = express.Router();



router.get('/api/people', (req, res) => {
    models.Person.findAll().then(people => {
        res.status(200).json({
            people: people,
        });
    })
        .catch(e => console.log(e));
});

// delete existing person by record id
router.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id).then(person => {
        person.destroy().then(() => {
            res.status(200).json({
                result: `Record ID ${req.params.id} Deleted`,
            })
        })
            .catch(e => console.log(e));
    })
        .catch(e => console.log(e));
});
// update an existing person
router.put('/api/person/:id', (req, res) => {
    // find person by id sent to us by user in the url
    models.Person.findByPk(req.params.id).then(person => {
        // call the update function on the person the database sent us back 
        // only update the fields i care about
        person.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }).then(person => {
            // the database was able to update the user
            // and it sent us back an updated record with the new information
            // we can now sent back this new information to the user
            res.status(200).json({ person: person });
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
});

// localhost: 3000/api/person/1/articles
// get all articles by person record id
router.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] }).then(person => {
        res.status(200).json({ person: person });
        res.status(200).json({ msg: req.params.id });

    }).catch(e => console.log(e));
});


// localhost: 3000/api/people get all people
router.get('/api/people', (req, res) => {
    models.Person.findAll().then(people => {
        res.status(200).json({
            people: people,
        });
    })
        .catch(e => console.log(e));
});



// create new person
router.post('/api/person/', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB });
        })
        .catch(e => console.log(e))

});


//post http://localhost:3000/api/person/:id'  get person by record id 
router.get('/api/person/:id', (req, res) => {
    // res.status(200).json({user_id:'Working...'});
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                } else {
                    res.status(404).json({ error: 'person not found' });
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "invalid ID" });
    }

});

export default router;
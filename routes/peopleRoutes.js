import express from 'express';
import models from '../models';

const router = express.Router();

// Get All people
router.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            })
        })
        .catch(e => console.log(e))
})

// Get person by record id
router.get('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person })
                } else {
                    res.status(404).json({ error: "person not found" })
                }
            })
            .catch(e => console.log(e))
    } else {
        res.status(418).json({ error: 'Invalid ID' })
    }
})

// Create new person
router.post("/api/person", (req, res) => {
    const person = req.body
    models.Person.create(person)
        .then(persondb => {
            res.status(200).json({ person: persondb })
        })
        .catch(e => console.log(e))
})

// Delete Person by Record ID
router.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(() => {
                res.status(200).send("Deleted successfully");
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});

// Update Person
router.put('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.update(req.body.person)
                .then(person => {
                    res.status(200).json({ person: person });
                }).catch(e => console.log(e));

        }).catch(e => console.log(e));
});

// Get All Article by Person Record ID

router.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ person: person });
        }).catch(e => console.log(e));
});
export default router;
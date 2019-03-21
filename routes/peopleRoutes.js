import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();

//Get all people
router.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            });
        })
        .catch(e => console.log(e));

});



router.get('/api/person/:id', (req, res) => {
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


router.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(() => {
                res.status(201).json({ result: `Record ID ${req.params.id} deleted` });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

});


router.put('/api/person/:id', (req, res) => {
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

router.get('/api/person/:id/articles', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
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
export default router;
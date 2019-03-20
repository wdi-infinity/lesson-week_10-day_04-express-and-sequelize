import express from 'express';
import models from './models';
import { read } from 'fs';
//declear bath route
const app = express();
const port = 3000;

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

//res.status(200).json({ message: 'working' }) to check the process is working 
//res.status(200).json({ user_id: req.params.id }); to check person data by id 


//const peopleList = [
// { firstName: 'Nahed', lastName: "Hawsawi" },
//  { firstName: 'Jone', lastName: "Jak" },
//  { firstName: 'Nahed', lastName: "Hawsawi" },
// { firstName: 'jamal', lastName: "hamed" },
// { firstName: 'jaswer', lastName: "nawras" }

// ]

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
});



app.listen(3000, () => console.log(`express-api app listening on port 3000!${port}!`))

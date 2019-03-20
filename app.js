import express from 'express';
import models from './models';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

// const peopleList = [
//   { firstName: 'Usman', lastName: 'Bashir' },
//   { firstName: 'Michael', lastName: 'Finneran' },
//   { firstName: 'Ghadeer', lastName: 'Alkhathlan' },
//   { firstName: 'Saja', lastName: 'Algadhi' },
//   { firstName: 'Hussah', lastName: 'Alakeel' },
//   { firstName: 'Ahmad', lastName: 'Alqahtani' },
//   { firstName: 'Abdullah', lastName: 'Alfehaid' }
// ];

app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
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
                } else {
                    res.status(404).json({ error: 'Person Not Found' });
                }
            })
      
      // 2==>>> res.status(200).json({person: person});
        
    .catch(e=> console.log(e));
        }else{
            res.status(406).json({error: "Invalid ID"});

        }
    // 1==>>> res.status(200).json({user_id: req.params.id});
});


app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
import express from 'express';
import models from './models'

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

// const peopleList = [{
//         firstName: 'Ahmad',
//         lastName: 'Yaseen'
//     },
//     {
//         firstName: 'Abdulrahman',
//         lastName: 'Alibrahim'
//     },
//     {
//         firstName: 'Usman',
//         lastName: 'Bashir'
//     },
//     {
//         firstName: 'Micheal',
//         lastName: 'Finneran'
//     },
//     {
//         firstName: 'Ghadeer',
//         lastName: 'Alkhathlan'
//     },
//     {
//         firstName: 'Saja',
//         lastName: 'Alghadi'
//     },
//     {
//         firstName: 'Ahmad',
//         lastName: 'Alqahtani'
//     }
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
    if( !isNaN(req.params.id) ) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                } else {
                    res.status(404).json({ error: 'Person Not Found'});
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID'});
    }
});

app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
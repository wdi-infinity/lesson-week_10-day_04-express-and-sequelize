import express from 'express';
import models from './models';

const app = express();
const port = 3000;

//  routre
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

// const people = [
//     { firstName: 'Hes', lasName: 'Aqeel' },
//     { firstName: 'Hal', lasName: 'Maimoni' },
//     { firstName: 'Sara', lasName: 'Yahya' },
//     { firstName: 'Rawan', lasName: 'Ahmadi' }

// ];

app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            });
        })
        .catch(e => console.log(e))
});
app.listen(port, () => console.log(`express-api listening on port ${port}`))



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



























// Usman's code****

// import express from 'express';
// import models from './models';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello WDI-Infinity!'
//     });
// });

// // const peopleList = [
// //   { firstName: 'Usman', lastName: 'Bashir' },
// //   { firstName: 'Michael', lastName: 'Finneran' },
// //   { firstName: 'Ghadeer', lastName: 'Alkhathlan' },
// //   { firstName: 'Saja', lastName: 'Algadhi' },
// //   { firstName: 'Hussah', lastName: 'Alakeel' },
// //   { firstName: 'Ahmad', lastName: 'Alqahtani' },
// //   { firstName: 'Abdullah', lastName: 'Alfehaid' }
// // ];

// app.get('/api/people', (req, res) => {
//     models.Person.findAll()
//         .then(peopleFromDB => {
//             res.status(200).json({
//                 people: peopleFromDB
//             });
//         })
//         .catch(e => console.log(e));
// });

// // localhost:3000/people.html 
// // localhost:3000/api/people

// app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
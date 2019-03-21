import express from 'express';
import models from './models'
import bodyParser from 'body-parser'
const app = express();
const port = 3000;


/***middleware***/
app.use(bodyParser.json());
/***Routes***/
//Root Path
app.get('/', (req, res) => {

    res.status(200).json({

        message: 'Hello WDI-Infinity!'
    });


});
// const peopleList = [
//     { firstName: 'Saja', lastName: 'ALi' },
//     { firstName: 'Anfal', lastName: 'jafrai' },
//     { firstName: 'Ghadeer', lastName: 'ALkhathlan' },
//     { firstName: 'Me', lastName: 'Me' },
//     { firstName: 'Usman', lastName: 'Bashir' },];


// Get ALl People
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {


            res.status(200).json({

                people: peopleFromDB

            });


        })
        .catch(e => console.log(e));




});
//Get person by Record ID
app.get('/api/person/:id', (req, res) => {
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
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json({ person: personNewFromDB });
        })
        .catch(e => console.log(e));




});
//Delete Person

// app.delete('/api/person/:id', (req, res) => {
//     models.Person.destroy(req.params.id)
//         .then(deletedperson => {
//             res.status(200).json({ person: deletedperson });
//         })
//         .catch(e => console.log(e));
// });
// Update an existing Person
http://localhost:3000/api/person/533
app.put('/api/person/:id', (req, res) => {
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
app.delete('/api/person/:id', (req, res) => {
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

})

//localhost:3000
//localhost:3000/api/people
//http://localhost:3000/api/articales
app.get('/api/articles', (req, res) => {
    models.Article.findAll()

        .then(articles => {
            res.status(200).json({ articles: articles })

        })
        .catch(e => console.log(e));

})

app.listen(port, () => console.log(`express-api app listninig on port ${port}!`));
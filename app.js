import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

/*** Middleware ***/

app.use(bodyParser.json());


/*** Routes ***/
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


// Get all people
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
                    res.status(404).json({ error: 'Person Not Found' });
                }
            })

        
    .catch(e=> console.log(e));
        }else{
            res.status(406).json({error: "Invalid ID"});

        }
});

//Create new person 
app.post('/api/person', ( req, res)=>{
    models.Person.create(req.body)
    .then(personNewFromDB =>{
        res.status(201).json({ person: personNewFromDB });
    })
    .catch(e => console.log(e));
})



//Update new person 
//put for update all think 
//patch for update one think 
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


//Delete exiting  Person By Record ID 
app.delete('/api/person/:id', (req, res)=> {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy().then(()=>{
                res.status(200).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});

// GET of all API Articales
//http://localhost:3000/api/articles
app.get('/api/articles', (req, res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
})

// GET of one  API Articales by ID
//http://localhost:3000/api/articles/1
app.get('/api/articles/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
})


//http://localhost:3000/api/person/1/articles
//GET all Articles by Person Record ID
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ person: person })
        }).catch(e => console.log(e));
    });


        

// this command drop all databace >>>>> models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
    console.log('SYNC COMPLETE');

    models.Article.create({
        title:'test3',
        content:'this is a body',
        PersonId:1
    });

    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
})


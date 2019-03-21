import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// MiddleWare
app.use(bodyParser.json());

// Routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI'
    });
});



// Get All people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(peopleFromDB => {
            res.status(200).json({
                people: peopleFromDB
            });
        })
        .catch(e => console.log(e))
});



// Get person by Record ID
app.get('/api/person/:id', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
            .then(person => {
                if (person !== null) {
                    res.status(200).json({ person: person });
                }
                else {
                    res.status(404).json({
                        error: 'person not found'
                    });
                }
            })
            .catch(e => console.log(e))
    }
    else {
        res.status(406).json({ error: 'Invalid ID' })
    }
})


// create new person
app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(personNewFromDBB => {
            res.status(201).json({ person: personNewFromDBB });
        })
        .catch(e => console.log(e));
})

//Update a person
app.put('/api/person/:id', (req, res) => {
    //find  Person by ID that sent to us bu user in the URL
    models.Person.findByPk(req.params.id)
        //call the update function on the person that database sent to us
        //only updae the fields i care about
        .then(person => {
            person.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })
                .then(person => {
                    //the database was able to update the user
                    //
                    res.status(200).json({ person: person })
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
});

//Delete a person
app.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
        .then(person => {
            person.destroy()
                .then(() => {
                    res.status(200).json({
                        result: `Record ID ${req.params.id} Deleted`,
                        success: true
                    })
                })
                .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
})


// http://localhost:3000/api/articles
//get all articles
app.get('/api/articles', (req, res) => {
    models.Article.findAll()
        .then(articles => {
            res.status(200).json({ articles: articles })
        })
        .catch(e => console.log(e))
})

//get one article by id
app.get('/api/articles/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Article.findByPk(req.params.id)
            .then(articles => {
                if (articles !== null) {
                    res.status(200).json({ articles: articles });
                }
                else {
                    res.status(404).json({
                        error: 'Article not found'
                    });
                }
            })
            .catch(e => console.log(e))
    }
    else {
        res.status(406).json({ error: 'Invalid ID' })
    }
})

// http://localhost:3000/api/person/1/articles
//get all articles bu person id
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ person: person })
        })
        .catch(e => console.log(e))
})

models.sequelize.sync().then(() => {
    console.log('sync complete');

    // models.Article.create({
    //     title: 'test2',
    //     content: 'test content2',
    //     PersonId: 1
    // });


    app.listen(port, () => console.log(`express-api app listeing on port ${port}!`))
})

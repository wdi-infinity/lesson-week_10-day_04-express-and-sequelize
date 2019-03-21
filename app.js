import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


// Middleware 
app.use(bodyParser.json());


//  routes

// Root Path
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

// Get All People 
app.get('/api/people', (req, res) => {
    models.Person.findAll()
        .then(people => {
            res.status(200).json({
                people: people
            });
        })
        .catch(e => console.log(e))
});
// Gets Person By Record ID
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


// Create new person 
app.post('/api/person', (req, res) => {
    // add data to db 
    models.Person.create(req.body)
        .then(personNewFromDB => {
            res.status(201).json(({ person: personNewFromDB }))
        })
        .catch(e => console.log(e));
});

// localhost:3000/people.html 
//  localhost:3000/api/people
// 



// HW:

// Delete
app.delete('/api/person/:id', (req, res) => {
    // I need to find a person by ID
    models.Person.findByPk(req.params.id)
        // person object -> holds a refrence of a person from sequlize   
        .then(person => {
            person.destroy().then(() => {
                res.status(200).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});

// Put --> update all fields of the record / Patch --> update one field 
// We usulay use Put for both cases, whihc is more conveneit
// update an existing person
app.put('/api/person/:id', (req, res) => {
    // --> we need to define and find the person we want to update
    // model find me a person with pk. if you find it return me the func -->  .then(person => {
    models.Person.findByPk(req.params.id)
        // person object -> holds a refrence of a person from sequlize   
        .then(person => {

            // person.update --> excpect a hash --> key and value * and create too
            person.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name
                // when you're done .then the 1st function which is updating a persong
            }).then(person => {
                // Excute the second one which is savong the perosin to the db
                res.status(200).json({ person: person });
            })
        }).catch(e => console.log(e))


        .catch(e => console.log(e));
});

// //  localhost:3000/api/articles 
//  Creating a new route 
app.get('/api/articles', (req, res) => {
    // res.status(200).json({ message: 'WORKING! ' });
    models.Article.findAll().then(articles => {
        // bring all aricles 
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e));
})

// get single article
// localhost:3000/api/article/1
app.get('/api/article/:id', (req, res) => {
    // res.status(200).json({ message: 'WORKING! ' });
    models.Article.findByPk(req.params.id).then(article => {
        // bring all aricles 
        res.status(200).json({ article: article });
    }).catch(e => console.log(e));
})

// localhost:3000/api/person/1/articles
// Get all articles by Person record ID 
app.get('/api/person/:id/articles', (req, res) => {
    // res.status(200).json({ message: 'WORKING! ' });
    // res.status(200).json({ msg: req.params.id });
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article, }] }).then(person => {
        // when calling one person by id --> an object of that perosn will show ; when using include: [{ model: Article }] --> the articles related to that peron appears
        res.status(200).json({ person: person })
    }).catch(e => console.log(e));

});


// localhost:3000/api/article/1/comments


// sync function / my web app should not run sync --> I dont want to listen to user until my app is synced to DB 
models.sequelize.sync({}).then(() => {
    console.log("SYNC COMPLETE ")
    // models.Article.create({
    //     title: "test2",
    //     content: "this is a body2",
    //     PersonId: 1
    // });
    app.listen(port, () => console.log(`express-api listening on port ${port}`))

})


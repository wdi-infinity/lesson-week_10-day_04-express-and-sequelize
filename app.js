import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'

const app = express();
const port = 3000;


// Middleware 
app.use(bodyParser.json());
app.use(peopleRouter);

//  routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello ppl !"
    });
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
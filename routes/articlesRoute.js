import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const artrouter = express();

artrouter.use(bodyParser.json());

// //  localhost:3000/api/articles 
//  Creating a new route 
artrouter.get('/api/articles', (req, res) => {
    // res.status(200).json({ message: 'WORKING! ' });
    models.Article.findAll().then(articles => {
        // bring all aricles 
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e));
})

// get single article
// localhost:3000/api/article/1
artrouter.get('/api/article/:id', (req, res) => {
    // res.status(200).json({ message: 'WORKING! ' });
    models.Article.findByPk(req.params.id).then(article => {
        // bring all aricles 
        res.status(200).json({ article: article });
    }).catch(e => console.log(e));
})

// localhost:3000/api/person/1/articles
// Get all articles by Person record ID 
artrouter.get('/api/person/:id/articles', (req, res) => {
    // res.status(200).json({ message: 'WORKING! ' });
    // res.status(200).json({ msg: req.params.id });
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article, }] }).then(person => {
        // when calling one person by id --> an object of that perosn will show ; when using include: [{ model: Article }] --> the articles related to that peron appears
        res.status(200).json({ person: person })
    }).catch(e => console.log(e));

});

// Create new article 
artrouter.post('/api/article', (req, res) => {
    models.Article.create(req.body)
        .then(article => {
            res.status(201).json(({ article: article }))
        })
        .catch(e => console.log(e));
});


// Edit an existing article 
artrouter.put('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.update({
                title: req.body.title,
                content: req.body.content
            }).then(article => {
                res.status(200).json({ article: article });
            })
        }).catch(e => console.log(e))
        .catch(e => console.log(e));
});

// Delete an existing article 
artrouter.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
        .then(article => {
            article.destroy().then(() => {
                res.status(200).json({
                    result: `Record ID ${req.params.id} Deleted`,
                    success: true
                });
            })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});

import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
const app = express();
const port = 3000;


/*** Middleware   */
app.use(bodyParser.json());
app.use(peopleRouter);

app.get('/', (req, res) => {
res.status(200).json({
    message: 'Hello WDI-Infinity'
});
});



app.get('/api/people', (req, res) => {
    models.Person.findAll()
    .then(people => {
        res.status(200).json({
            people: people  // people from DB the 2nd one the 1nd is key of object 
        });
    })
        .catch(e => console.log(e)); 
});




      
      app.get('/api/articles', (req, res) => {
          models.Article.findAll()
          .then(articles => {
              res.status(200).json({ articles: articles });
          })
          .catch(e => console.log(e));
      })


      app.get('/api/article/:id', (req, res) => {
        models.Article.findByPk(req.params.id).then(article => {
        res.status(200).json({ article: article });
      }).catch(e => console.log(e));
    })


// http://localhost:3000/api/person/1/articles
// Get All Articles by Person Record ID
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, {include: [{ model: models.Article }] })
    .then(person => {
    res.status(200).json({ person: person });
    }).catch(e => console.log(e));
    

  });

models.sequelize.sync().then(() => {
console.log(' sync complete');
models.Article.create({
title: 'test',
content: 'this is a body',
PersonId: 1
});

app.listen(port, () => console.log(`express-api app listening on port ${port}`));
})


import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'
const app = express();
const port=3000;
/*** Middleware ***/

app.use(bodyParser.json());
app.use(peopleRouter);
// localhost: 3000/
/** Routes path */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello WDI-Infinity!',
  });
});

// const people = [
//   { firstName: 'alia', lastName: 'alrashidi' },
//   { firstName: 'usman', lastName: 'bashir' },
//   { firstName: 'ghdeer', lastName: 'alkhathlan' },
//   { firstName: 'michael', lastName: 'finneran' },
//   { firstName: 'fajer', lastName: 'albakiri' },
// ];


// localhost: 3000/api/articles get all articles
app.get('/api/articles', (req, res) => {
  // res.status(200).json({message: 'working'});
     models.Article.findAll().then(articles => {
     res.status(200).json({articles: articles});
     }).catch(e => console.log(e));
})

app.get('/api/article/:id', (req, res) => {
  //  res.status(200).json({message: 'working'});
    models.Article.findByPk(req.params.id).then(article => {
    res.status(200).json({article: article});
    }).catch(e => console.log(e));
})


// localhost: 3000/api/article/2/comments

// eslint-disable-next-line no-console
models.sequelize.sync().then(() => {
  console.log('sync complete');
  //  models.Article.create({
  //   title: 'test 2',
  //   content: 'this is a body 2',
  //   PersonId: 1
  //    });
  app.listen(port, () => console.log(`express-api app listening on port ${port}!`));

})

import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'
import articlesRouter from './routes/articlesRoutes'
const app = express();
const port=3000;
/*** Middleware ***/

app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articlesRouter);
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

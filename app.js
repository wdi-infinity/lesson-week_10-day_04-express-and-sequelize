import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articlesRouter from './routes/articlesRoutes';

const app = express();
const port = 3000;

/* Middleware */

app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articlesRouter);

/** routes **/

//Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    });
});

// models.sequelize.sync()
// .then(() => {
//     console.log('sync complete');
//     models.Article.create({
//         title: 'text 2',
//         content: 'this is a body of 2',
//         PersonId: 1
//     })
    app.listen(port, () => console.log(`express-api and listening on port ${port}!`));
// })


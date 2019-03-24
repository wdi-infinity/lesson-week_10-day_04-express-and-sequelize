import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articlesRoutes from './routes/articlesRoutes';

const app = express();
const port = 3000;

/****** Middleware  ****/
// run between req and res
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articlesRoutes);
/**** Routes ***/

// Root path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello WDI-Infinity!"
    });
})

models.sequelize.sync()
    .then(() => {
        console.log('sync complate');
        // models.Article.create({
        //     title: "test",
        //     content: "this is a body",
        //     PersonId: 1
        // })

        app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
    }).catch(e => console.log(e));


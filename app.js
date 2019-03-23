import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import people from './routes/people';
import article from './routes/article';

const app = express();
const port = 3000;

// MiddleWare
app.use(bodyParser.json());
app.use(people);
app.use(article);

// Routes

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI'
    });
});

models.sequelize.sync().then(() => {
    console.log('sync complete');

    // models.Article.create({
    //     title: 'test2',
    //     content: 'test content2',
    //     PersonId: 1
    // });


    app.listen(port, () => console.log(`express-api app listeing on port ${port}!`))
})

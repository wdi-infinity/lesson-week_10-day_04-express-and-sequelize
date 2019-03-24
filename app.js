import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articleRoutes from './routes/articleRoutes';

const app = express();
const port = 3000;

/*** Middleware ***/
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articleRoutes);
//app.use(peopleRouter)

// localhost: 3000/
/** Routes path */
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!',
    });
});

// const people = [
//   { firstName: 'nahed', lastName: 'Hawsawi' },
//   { firstName: 'Jaser', lastName: 'Yonis' },
//   { firstName: 'ghdeer', lastName: 'alkhathlan' },
//   { firstName: 'michael', lastName: 'finneran' },
//   { firstName: 'Aser', lastName: 'yonis' },
// ];

models.sequelize.sync().then(() => {
    console.log('sync complete');
    //if just server is run create new article 
    // models.Article.create({
    // title: 'test 2',
    // content: 'this is a body',
    //  PersonId: 1
    //  });
    app.listen(port, () => console.log(`express - api app listening on port ${port} !`));
})



import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRoutes from './routes/peopleRoutes'
import articleRoutes from './routes/articleRoutes'

const app = express();
const port = 3000;

/*** Middleware ***/
app.use(bodyParser.json());
app.use(peopleRoutes);
app.use(articleRoutes);


/*** Routse ***/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});






// localhost:3000/people.html 
// localhost:3000/api/people
// localhost:3000/api/person/2
// POST localhost:3000/api/person/2
//localhost:3000/api/articles






models.sequelize.sync().then(() => {
    console.log("sync complete");
    // models.Article.create({
    //     title: 'test',
    //     content: 'this is the body',
    //     PersonId: 1
    // });
    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
})
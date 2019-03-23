import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articleRouter from './routes/articleRoutes';
const app = express();
const port = 3000;


/*** Middleware   */
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articleRouter);

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





models.sequelize.sync().then(() => {
console.log(' sync complete');
models.Article.create({
title: 'test',
content: 'this is a body',
PersonId: 1
});

app.listen(port, () => console.log(`express-api app listening on port ${port}`));
})


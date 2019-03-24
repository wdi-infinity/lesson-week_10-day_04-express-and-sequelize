import express from 'express';
import models from './models'
import bodyParser from 'body-parser'
import peopleRoutes from './routes/peopleRoutes';
const app = express();
const port = 3000;


/***middleware***/
app.use(bodyParser.json());
app.use(peopleRoutes);
/***Routes***/
//Root Path
app.get('/', (req, res) => {

    res.status(200).json({

        message: 'Hello WDI-Infinity!'
    });


});
// const peopleList = [
//     { firstName: 'Saja', lastName: 'ALi' },
//     { firstName: 'Anfal', lastName: 'jafrai' },
//     { firstName: 'Ghadeer', lastName: 'ALkhathlan' },
//     { firstName: 'Me', lastName: 'Me' },
//     { firstName: 'Usman', lastName: 'Bashir' },];


// Get ALl People


//localhost:3000
//localhost:3000/api/people
//http://localhost:3000/api/articales
app.get('/api/articles', (req, res) => {
    models.Article.findAll()

        .then(articles => {
            res.status(200).json({ articles: articles })

        })
        .catch(e => console.log(e));

})
app.get('/api/articles/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
        res.status(200).json({ article: article });

    }).catch(e => console.log(e));

})
//{ force: true }
//http://localhost:300/api/person/1/articales  this is example of relations link 
//Get all Articles by person id 
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
        .then(person => {
            res.status(200).json({ article: article });

        }).catch(e => console.log(e));



});



models.sequelize.sync().then(() => {

    console.log('sync complete');

    // models.Article.create({
    //     title: 'test',
    //     content: 'this is a body',
    //     personId: 1
    // });
    app.listen(port, () => console.log(`express-api app listninig on port ${port}!`));
})


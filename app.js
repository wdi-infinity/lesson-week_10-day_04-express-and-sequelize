import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';

const app = express();
const port = 3000;

/*** Middleware ***/

app.use(bodyParser.json());
app.use(peopleRouter)

/*** Routes ***/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

// const peopleList = [
//   { firstName: 'Usman', lastName: 'Bashir' },
//   { firstName: 'Michael', lastName: 'Finneran' },
//   { firstName: 'Ghadeer', lastName: 'Alkhathlan' },
//   { firstName: 'Saja', lastName: 'Algadhi' },
//   { firstName: 'Hussah', lastName: 'Alakeel' },
//   { firstName: 'Ahmad', lastName: 'Alqahtani' },
//   { firstName: 'Abdullah', lastName: 'Alfehaid' }
// ];







// GET of all API Articales
//http://localhost:3000/api/articles
app.get('/api/articles', (req, res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
})

// GET of one  API Articales by ID
//http://localhost:3000/api/articles/1
app.get('/api/articles/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e))
})


// //http://localhost:3000/api/person/1/articles
// //GET all Articles by Person Record ID
// app.get('/api/person/:id/articles', (req, res) => {
//     models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
//         .then(person => {
//             res.status(200).json({ person: person })
//         }).catch(e => console.log(e));
//     });



    //http;//localhost:3000/api/article/1/comments

// this command drop all databace >>>>> models.sequelize.sync({ force: true }).then(() => {
models.sequelize.sync().then(() => {
    console.log('SYNC COMPLETE');

    // models.Article.create({
    //     title:'test3',
    //     content:'this is a body',
    //     PersonId:1
    // });

    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
})


import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articlesRouter from './routes/articlesRoutes';

const app = express();
const port = 3000;
/* middleware */

app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articlesRouter);

/* Routes*/

//Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
});

// const people = [
//     { firstName: 'Rawan', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan1', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan2', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan3', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan4', lastName: 'Alahmmadi' },
//     { firstName: 'Rawan5', lastName: 'Alahmmadi' }
// ]




app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
        .then(person => {
            res.status(201).json({ person: person });
        })
        .catch(e => console.log(e));
});

// My solution
// app.delete('/api/person/:id', (req, res) => {
//     if (!isNaN(req.params.id)) {
//         models.Person.destroy({
//             where: { id: req.params.id }
//         })
//             .then(person => {
//                 res.status(201).json({ person: person });
//             })
//             .catch(e => console.log(e));
//     } else {
//         res.status(406).json({ error: 'Invalid ID' });
//     }
// });


//Usman solution



//My solution 
app.patch('/api/person/:id', (req, res) => {
    if (!isNaN(req.params.id)) {
        models.Person.update({ first_name: "Rawan9", last_name: "Alahmadi" }, { where: { id: req.params.id } }
        )
            .then(person => {

                res.status(201).json({ person: person });
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }
});



//Usman solution 



app.get('/api/articles', (req, res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e));

});

app.get('/api/article/:id', (req, res) => {
    //  res.status(200).json({ msg: 'still working ..' });
    if (!isNaN(req.params.id)) {
        models.Article.findByPk(req.params.id)
            .then(article => {
                if (article !== null) {
                    res.status(200).json({ article: article });
                }
                else {
                    res.status(404).json({ error: 'Article Not Found' });
                }
            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: 'Invalid ID' });
    }

});

// Get All Articles by Person Record ID 




models.sequelize.sync().then(() => {
    console.log('sync complete');
    // models.Article.create({
    //     title: 'test 2',
    //     content: 'this is a body 2',
    //     PersonId: 1
    // });
    app.listen(port, () => console.log(`express-api listening on port ${port}!`))
})

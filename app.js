import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'
import passport from 'passport';
import jwt from 'jsonwebtoken';
import startegy from './lib/passportStartegy';
import jwtOptions from './lib/passportOptions';

const app = express();
const port = 3000;
const test_user = { id: 1, username: "Hala", password: "1234" }
passport.use(startegy);
/*** Middleware ***/

app.use(bodyParser.json())
app.use(passport.initialize())
app.use(peopleRouter)

/*** Routs  ***/

//root path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})


app.post('/api/login', (req, res) => {
    if (req.body.username && req.body.password) {

        // Find the user based on their username in our database
        models.Person.findOne({
            where: { username: req.body.username }
        })
            .then(person => {
                if (person !== null) {
                    if (person.password === req.body.password) {
                        // Select the information we want to send to the user.
                        const payload = { id: person.id };
                        // Build a JWT token using the payload
                        const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 });
                        // Send the JWT Token to the user.
                        res.status(200).json({ success: true, token: token });
                    } else {
                        res.status(401).json({ error: 'Invalid username or password' });
                    }
                } else {
                    res.status(401).json({ error: 'Invalid username or password' });
                }
            })
            .catch(e => console.log(e));

        // // This should be a Database call.
        // if(req.body.username === test_user.username) {
        //   if(req.body.password === test_user.password) {
        //     // Select the information we want to send to the user.
        //     const payload = { id: test_user.id };
        //     // Build a JWT token using the payload
        //     const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 60 });
        //     // Send the JWT Token to the user.
        //     res.status(200).json({ success: true, token: token });
        //   } else {
        //     res.status(401).json({ error: 'Invalid username or password' });
        //   }
        // } else {
        //   res.status(401).json({ error: 'Invalid username or password' });
        // }
    } else {
        res.status(400).json({ error: 'Username & Password Required' });
    }
});

app.get('/api/mymovies', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: "you should only see this vaild token" });
})

const people = [
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' }
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
})

// get all articles
app.get('/api/articles', (req, res) => {

    models.Article.findAll()
        .then(articleFromDB => {
            res.status(200).json({
                articles: articleFromDB
            });
        })
        .catch(e => console.log(e));
});

// get article by id
app.get('/api/articles/:id', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Article.findByPk(req.params.id)
            .then(articleFromDB => {

                if (articleFromDB !== null) {
                    res.status(200).json({ article: articleFromDB });
                } else {
                    res.status(404).json({ message: "article NOT found" });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID" });
    }

});

//Get all articles by person
app.get('/api/person/:id/articles', (req, res) => {

    if (!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id, { include: [{ model: models.Article }] })
            .then(personFromDB => {

                if (personFromDB !== null) {
                    res.status(200).json({ person: personFromDB });
                } else {
                    res.status(404).json({ message: "person NOT found" });
                }

            })
            .catch(e => console.log(e));
    } else {
        res.status(406).json({ error: "Invalid ID" });
    }

});

// models.sequelize.sync({ force: true }).then(() => {
//     console.log('sync complete');

//     models.Person.create({
//         first_name: 'Majd',
//         last_name: 'Saleh',
//         username: 'glllory',
//         password: '1234'
//     });

//     app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
// });


models.sequelize.sync().then(() => {
    console.log('sync complete');

    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
});

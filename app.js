import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import startegy from './lib/passportStartegy';
import jwtOptions from './lib/passportOptions';

const app = express();
const port = 3000;

// Dummy User for Testing ONLY!!.
const test_user = { id: 1, username: 'ahmad', password: '1234' };

// define our auth startegy from before
passport.use(startegy)
/*** Middleware ***/

app.use(bodyParser.json());
app.use(peopleRouter);
// app.use(articlesRouter);
// only init after setting a startegy
app.use(passport.initialize());


/*** Routes ***/

// Root Path
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

app.post('/api/login', (req, res) => {
    if(req.body.username && req.body.password) {

        models.Person.findOne({
            where: { username: req.body.username }
          })
          .then(person => {
            if(person !== null) {
              if(person.password === req.body.password) {
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
        } else {
            res.status(400).json({ error: 'Username & Password Required' });
          }
        });

//             // This should be a Database call.
//       if(req.body.username === test_user.username) {
//         if(req.body.password === test_user.password) {
//         // Select the information we want to send to the user.
//         const payload = { id: test_user.id };
//         // Build a JWT token using the payload
//         const token = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: 60});
//         // Send the JWT Token to the user.
//         res.status(200).json({ success: true, token: token });
//         } else {
//           res.status(401).json({ error: 'Invalid username or password' });
//         }
//       } else {
//         res.status(401).json({ error: 'Invalid username or password' });
//       }
//     } else {
//       res.status(400).json({ error: 'Username & Password Required' });
//     }
//   });

  app.get('/api/mymovies', (res, req) => {
      res.status(200).json({ message: "you should only see this with valid token" })
  })

app.get('/api/articles', (req, res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles: articles });
    }).catch(e => console.log(e));
})

// http://localhost:3000/api/article/1
app.get('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id).then(article => {
        res.status(200).json({ article: article });
    }).catch(e => console.log(e));
})

// http://localhost:3000/api/person/1/articles
// Get All Articles by Person Record ID
app.get('/api/person/:id/articles', (req, res) => {
    models.Person.findByPk(req.params.id, { include: [{ model: models.Article }]})
    .then(person => {
        res.status(200).json({ person: person });
    }).catch(e => console.log(e));
});

// http://localhost:3000/api/article/1/comments

// http://localhost:3000/api/article/132/reviews

models.sequelize.sync().then(() => {
    console.log('sync complete');

    // models.Article.create({
    //     title: 'test 2',
    //     content: 'this is a body of 2',
    //     PersonId: 1
    // });

    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
})
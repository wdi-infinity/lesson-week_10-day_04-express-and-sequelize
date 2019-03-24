import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articlesRouter from './routes/articlesRoutes';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import startegy from './lib/passportStartegy';
import jwtOptions from './lib/passportOptions';

const app = express();
const port=3000;

//startegy will check if the token is valid or not
passport.use(startegy);

//Dummy user
const test_user = {id:1,username:"fajr",password: "1234"}
/*** Middleware ***/

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(peopleRouter);
app.use(articlesRouter);
//Only init after setting a startegy

// localhost: 3000/
/** Routes path */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello WDI-Infinity!',
  });
});

app.post('/api/login', (req, res) => {
  if(req.body.username && req.body.password) {

    // Find the user based on their username in our database
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


app.get('/api/mymovies',
 passport.authenticate('jwt', {session: false}),(req,res) => {
  res.status(200).json({message: "you should only see thos with valid token"})
});
// localhost: 3000/api/article/2/comments

// eslint-disable-next-line no-console
models.sequelize.sync({force: true}).then(() => {
  console.log('sync complete');
  //  models.Article.create({
  //   title: 'test 2',
  //   content: 'this is a body 2',
  //   PersonId: 1
  //    });

  models.Person.create({
    first_name: "Alya",
    last_name: 'Hadi',
    username: "صوصج",
    password: "ilovefajr"
  })

  app.listen(port, () => console.log(`express-api app listening on port ${port}!`));

})
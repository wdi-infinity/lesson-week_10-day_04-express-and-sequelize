//you have to add this by yourself
import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';
import articleRouter  from './routes/articlesRoutes';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import startegy from './lib/passportStartegy';
import jwtOptions from './lib/passportOptions'

const app = express();
const port =3000;

/**Middleware */
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(peopleRouter);
app.use(articleRouter);


//Dummy user for test 
const test_user = {id:1, username: 'asmaa', password:'1234'};
//Define our auth startegy from before
passport.use(startegy);
//Routes

//Root Path
app.get ('/',(req,res)=>{
res.status(200).json({
message: "Hello WDI-Infinity!"
});
});


//check in username and password sent or no
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

// const people = [
// {firstName:'Waad',lastName:'Baabdullah'},
// {firstName:'Asma',lastName:'Baabdullah'},
// {firstName:'Afrah',lastName:'Baabdullah'},
// {firstName:'Samah',lastName:'Baabdullah'},
// {firstName:'Tahani',lastName:'Baabdullah'},
// {firstName:'khalid',lastName:'Baabdullah'},
// {firstName:'Mohammad',lastName:'Baabdullah'}
// ];


//new route
//localhost:3000
//localhost:3000/api/people api is a convention
//each apis must come after localhost:3000/api/ is the best way  






////http://localhost:3000/api/p/article/1/comments

//this will call Strategy
app.get('/api/mymovies',passport.authenticate('jwt',{ session:false }),(req,res)=> {
    res.status(200).json({message :'You should only see this with vaild token'});
})
//passportStartegy
// const startegy = new JWTStrategy(jwtOptions, (jwt_payload,next) => {

//     console.log('payload received!');

//     next(null, test_user);
// });

models.sequelize.sync()
.then(()=>{
console.log('sync complete');
 models.Person.create({
first_name:'asmaa',
last_name:"Baabdullah",
username:'asmaa',
password:'1234'
 });
app.listen(port,()=>
 {console.log(`express-api app listening on port ${port}!`)})
});


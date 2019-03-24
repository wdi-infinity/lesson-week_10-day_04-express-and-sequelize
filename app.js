import express from 'express';
import bodyParser from 'body-parser'
import models from './models'
import peopleRouter from './routes/peopleRoutes';
import articlesRouter from './routes/articlesRoutes';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import strategy from './lib/passportStrategy';
import jwtOptions  from './lib/passportOptions';

const app = express();
const port = 3000

// user for testing
const test_user = {id: 1, username: "Hala", password: "1234"}
passport.use(strategy);


// Middleware
app.use(bodyParser.json())
// only init after setting a strategy
app.use(passport.initialize())
app.use(peopleRouter);
app.use(articlesRouter);


/***  Routes ***/

// Route path
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})


app.post('/api/login', (req, res) => {
    if(req.body.username && req.body.password) {
        models.Person.findOne({
            where: {username: req.body.username}
        }).then(person => {
            if(person !== null){
                if(person.password === req.body.password) {
                // send jwt token
                // Select the information we want to send to the user
                const payloud = {id: test_user.id}
                // build a jwt token using the payloud
                const token = jwt.sign(payloud, jwtOptions.secretOrKey, {expiresIn: 60})
                // send the jwt token to the user
                res.status(200).json({success: true, token: token})
                } else {
                    res.status(401).json({error: "Invalid username or password"}) 
                }
            } else {
                res.status(401).json({error: "Invalid username or password"}) 
            }
        })
        // this should be a database call
        // if(req.body.username === test_user.username) {
        //     if(req.body.password === test_user.password){
        //         // Select the information we want to send to the user
        //         const payloud = {id: person.id}
        //         // build a jwt token using the payloud
        //         const token = jwt.sign(payloud, jwtOptions.secretOrKey, {expiresIn: 60})
        //         // send the jwt token to the user
        //         res.status(200).json({success: true, token: token})
        //     } else {
        //         res.status(400).json({error: "Invalid username or password"})
        //     }
        // } else {
        //     res.status(400).json({error: "Invalid username or password"})
        // }

    } else {
        res.status(400).json({error: "username & password required"})
    }
})

app.get('/api/movies', 
passport.authenticate('jwt', {session: false}),
(req, res) => {
    res.status(200).json({ message: "You should only see this with valid token"})
})


models.sequelize.sync().then(() => {
    console.log('sync complete');
    // models.Person.create({
    //         first_name: "Hala",
    //         last_name: "Almaimoni",
    //         username: "hala11",
    //         password: "1234"
    //     })
    app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
  })

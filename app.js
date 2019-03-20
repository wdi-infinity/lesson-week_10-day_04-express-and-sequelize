import express from 'express';
import models from './models';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello WDI-Infinity!'
    });
});

//to get all the data about people
app.get('/api/people', (req,res) => {
    models.Person.findAll()
    .then(people => {
        res.status(200).json({
            //the first people is just the key, so it's changable but not the second one.
            people: people
        });
    })
    .catch(e => console.log(e));
  
});

app.get('/api/person/:id', (req,res) => {
    // did this line just to test if this command is working
    // res.status(200).json({message: 'working...'});
    // did this line if the *id* is working 
    // res.status(200).json({user_id: req.params.id});
    if(isNaN(req.params.id) === false){
        models.Person.findByPk(req.params.id)
        .then(person => {
        if(person !== null){
            res.status(200).json({person: person});
            }
        else{
            res.status(404).json({error: "Person is not found"});
            }
        })
        .catch(e => console.log(e));
    }else{
        res.status(406).json({error: 'Invalid ID'});
    }
    
})
// const people = [
//     {firstName: 'saud', lastName: 'Almutairi'},
//     {firstName: 'nors', lastName: 'Abdullah'},
//     {firstName: 'mohammed', lastName: 'Saja'},
// ]


app.listen(port, ()=> console.log(`working on port ${port}`));
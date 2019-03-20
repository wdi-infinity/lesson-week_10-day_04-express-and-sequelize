import express from 'express';
import models from './models';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.status(200).json({
    message: 'Hello WDI-Infinity'
});
});


// const people = [
//     { firstName: 'Ahmad', lastName:'Almansor' },
//     { firstName: 'Abdullah', lastName:'Ahmad' },
//     { firstName: 'Abdullah', lastName:'Alfehaid' },
//     { firstName: 'Ahmad', lastName:'Almansor' },
//     { firstName: 'Ahmad', lastName:'Almansor' }    
// ];


app.get('/api/people', (req, res) => {
    models.Person.findAll()
    .then(people => {
        res.status(200).json({
            people: people  // people from DB the 2nd one the 1nd is key of object 
        });
    })
        .catch(e => console.log(e)); 
});



app.get('/api/person/:id', (req, res) => {
    if( !isNaN(req.params.id) )
    models.Person.findByPk(req.params.id)
    .then(person => {
        if(person !== null ){
            res.status(200).json({person: person})
        } else {

            res.status(406).json({ error : 'Person Not Found'})          
        } 
    })
    .catch(e => console.log(e)); 
else {
    res.status(200).json({ erroe: 'Invalid ID' })
}
});





// localhost:3000/
// localhost:3000/api/people


app.listen(3000, () => console.log(`express-api app listening on port ${port}`));

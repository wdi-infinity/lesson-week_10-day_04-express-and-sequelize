import express from 'express';
import models from './models';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    });
});

// const peopleList =[
//     {first_name: "Salem", last_name: "Turki"},
//     {first_name: "Usman", last_name: "Basheer"},
//     {first_name: "Ghadeer", last_name: "Turki"},
//     {first_name: "Mohammad", last_name: "Jameel"},
//     {first_name: "Hussah", last_name: "Alakeel"}
// ];

app.get('/api/people', (req, res) => {
    models.Person.findAll()
    .then(peopleFromDb => {
        res.status(200).json({
            people: peopleFromDb
            });
    })
    .catch(e => console.log(e));
   
});

app.get('/api/person/:id', (req, res) =>{
    if(!isNaN(req.params.id)) {
        models.Person.findByPk(req.params.id)
    .then(person => {
        if(person !== null){
        res.status(200).json({ person: person });
        } else {
            res.status(404).json({ error: 'Person Not Found'})
        }
    })
    .catch(e => console.log(e));
}else{
    res.status(406).json({error: 'Invalid ID'});
}
});

// localhost: 3000
// localhost: 3000/

app.listen(port, () => console.log(`express-api and listening on port ${port}!`));
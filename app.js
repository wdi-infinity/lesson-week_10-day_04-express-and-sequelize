import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!!!'
    });
});

// Get person by record ID
app.get('/api/people', (req, res) => {

    models.Person.findAll()
    .then(peopleList => {
        res.status(200).json({
            people: peopleList
        });        
    })
    
    .catch(e => console.log(e));
});

app.get('/api/person/:id', (req,res) => {
    if( !isNaN(req.params.id)) {
    models.Person.findByPk(req.params.id)
    .then(person => {
        
        if (person !== null){
            res.status(200).json({ person: person });
        } else { 
            res.status(404).json({ error: 'Person Not Found'});
        }
    })
    .catch(e => console.log(e));
    } else {
    res.status(406).json({ error: "Invalid ID" })
    }
});

app.post('/api/person', (req, res) => {
    models.Person.create(req.body)
    .then(person => {
        res.status(200).json({ result: req.body});
    })
    .catch(e => console.log(e));
});

app.listen(port, () => console.log(`express-api app listening on port ${port}!`))



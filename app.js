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

// update an existing person
app.put('/api/person/:id',(req, res) => {
    // find person by ID sent to us by user in the URL 
    models.Person.findByPk(req.params.id).then(person => {
        // Call the update on the person sent back by the db.
        // Only update the feilds I specified.
        person.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }).then(person => {
            // the db was able to update the user
            // 
            res.status(200).json({ person: person });
        })

    }).catch(e => console.log(e));
})

// delete an existing person by record ID
app.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
    .then(person =>{
        person.destroy().then(() => {
            res.status(200).json({
                result: `Record ID ${req.params.id} Deleted`,
                success: true 
            });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});

app.listen(port, () => console.log(`express-api app listening on port ${port}!`))



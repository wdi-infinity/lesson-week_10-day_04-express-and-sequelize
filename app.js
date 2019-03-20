import express from 'express';
import models from './models'

const app = express();
const port = 3000;
//localhost:3000
app.get('/',(req , res) => {
res.status(200).json({
    message: 'Hello WDI-Infinty!'
})
});
// const people = [
//     {first_name: 'abdulmohsin' , last_name: 'sharhan'},
//     {first_name: 'Ahmed' , last_name: 'alqhtani'},
//     {first_name: 'Saud' , last_name: 'almutari'},
//     {first_name: 'Moath' , last_name: 'althwid'}
// ]
//localhost:3000/api/people display all list
app.get('/api/people' , (req , res ) => {
    //Find all people
    models.Person.findAll()
    .then(people => {
        res.status(200).json({
            //display array of people
            people: people
          })
    })
    .catch( e => console.log(e))
  
})

//localhost:3000/api/person/:id to Find one person at a time
app.get('/api/person/:id' , (req , res ) => {

    const id = req.params.id
    if(!isNaN(id)){
    models.Person.findByPk(id)//One person

    .then(person => {
        if (person !== null){
        res.status(200).json({  person: person  })
        }
        else {
            res.status(404).json({  error: 'Person Not Found'  })
        }
    })
    .catch( e => console.log(e))
}
else {
    res.status(406).json({  error: 'Invalid ID'  })
}
})
app.listen(port, ()=> console.log(`express-api listening on port ${port}`));
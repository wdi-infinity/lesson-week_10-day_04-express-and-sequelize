import express from 'express';
import models from './models';

const app =  express();
const port = 3000;

app.get('/',(req,res)=> {
res.status(200).json({
    message:'Hello WDI-Infinity!'
});
});

// const peopleList = [
//     { firstName: 'mohmamag' ,lastName:'omar'},
//     { firstName: 'ali' ,lastName:'narul'},
//     { firstName: 'ganduf' ,lastName:'omar'},
//     { firstName: 'mohmamag' ,lastName:'omar'},
//     { firstName: 'ali' ,lastName:'narul'},
//     { firstName: 'ganduf' ,lastName:'omar'},
//     { firstName: 'mohmamag' ,lastName:'omar'},
//     { firstName: 'ali' ,lastName:'narul'},
//     { firstName: 'ganduf' ,lastName:'omar'}
// ]

app.get('/api/people', (req, res) => {
    models.Person.findAll()
    .then(peopleFromDB => {
res.status(200).json({
        people: peopleFromDB
       } );
    })
    .catch(e => console.log(e))
    
});

app.get('/api/person/:id', (req, res) => {
   if(!isNaN(req.params.id)){
 models.Person.findByPk(req.params.id)
    
      .then(person => {
        if(person !== null ){
            res.status(200).json({person: person});
        } else {
            res.status(416).json({message: "person not found"});
        
        }
      })
      .catch(e => console.log(e));
  
} else {
    res.status(406).json({error: 'onvilde ID'});
}
})

app.listen(port, () => {
    console.log(`.:|:|:|:|:|express-api app Server started on ${port}|:|:|:|:.`);
});

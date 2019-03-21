import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();

//Rout get all people
router.get('/api/people', (req,res) => {
    models.Person.findAll()
    .then(people => {
        res.status(200).json({ people: people });
      })
      .catch(e => console.log(e));
    });


    //Rout get person by id
    router.get('/api/person/:id', (req, res) => {
        if( !isNaN(req.params.id)){
               models.Person.findByPk(req.params.id).then(person => {
                   if(person !== null){
                   res.status(200).json({ person: person });
                   } else {
                       res.status(404).json({ error: 'Person Not Found' }); 
                   }
               })
               .catch(e => console.log(e));
   } else {
       res.status(406).json({error: 'Invalid ID'})
   }
     });

// create new person 
router.post('/api/person', (req,res) => {
   models.Person.create(req.body)
   .then(personnewformdb => {
       res.status(201).json({ person: personnewformdb});
   })
   .catch(e => console.log(e));
});





// update the person 
router.put('/api/person/:id', (req, res) => {
   // Find person By ID sent to us by user in the URL
   models.Person.findByPk(req.params.id)
   .then(person => {
        // Call the Update function on the Person the database sent us back.
       // Only update the fields I care about. 
       person.update({
           first_name: req.body.first_name,
           last_name: req.body.last_name
       }).then(person => {
      // The database was able to update the user
     // And it sent us back an updated Record with the new information
     // We can now send back this new information to the user
           res.status(200).json({ person : person });
       }).catch(e => console.log(e));
   })
   .catch(e => console.log(e));
});


// delete the person 
router.delete('/api/person/:id', (req, res) => {
   models.Person.findByPk(req.params.id)
   .then(person => {
       person.destroy().then(() => {
           res.status(200).json({
               result: `Record ID ${req.params.id} deleted`,
               success: true
           })
       })
   })
   .catch(e => console.log(e));
});

export default router;
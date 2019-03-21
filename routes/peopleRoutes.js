import express from 'express';
import models from '../models'; //2 points cause it is under the app
import bodyParser from 'body-parser';

const router = express.Router();



router.get('/api/people', (req, res) => {
    models.Person.findAll()
    //read data from database
      .then(peopleFromDB => {
        res.status(200).json({
          people: peopleFromDB
        });
      })
      .catch(e => console.log(e));
  });


  router.get('/api/person/:id', (req, res) => {
    if( !isNaN(req.params.id) ) {
      models.Person.findByPk(req.params.id)
      .then(person => {
        if(person !== null) {
          res.status(200).json({ person: person });
        } else {
          res.status(404).json({ error: 'Person Not Found' });
        }
      })
      .catch(e => console.log(e));
    } else {
      res.status(406).json({ error: 'Invalid ID' });
    }
  });
//res.status(200).json({user_id: req.params.id});


//post
//no need for id cause the db will do it for me
router.post('/api/person',(req,res) =>  {
    //need to test your data first
    models.Person.create(req.body)
    .then(personNewFromDB => {
        res.status(201).json({ person:personNewFromDB });

    })
    .catch(e => console.log(e));

});


//To update
router.put('/api/person/:id', (req, res) => {
    //Find Person By ID sent to us by User in the URL
        models.Person.findByPk(req.params.id).then (person => {
            //call the UPDATE function on the Person the database sent us back.
            //only update the fields I care about.
        person.update({
            first_name:req.body.first_name,
            last_name:req.body.last_name
        }).then (person =>{
            //The database was able to update the user
            //and it sent us back an updated Recored with the new  one
            res.status(200).json({ person: person });
        }).catch(e => console.log(e));

        }).catch(e => console.log(e));

    });




       
    

//To delete exiting Person by record Id 
//find the record first
//then delete it 
router.delete('/api/person/:id', (req, res) => {
    models.Person.findByPk(req.params.id)
    //person is reference to the record
    .then(person => {
        person.destroy()
        .then(()=>{res.status(200).json({
            result:`Record ID ${req.params.id} Deleted`,
            success: true
        });
        
    })
    .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});
export default router;
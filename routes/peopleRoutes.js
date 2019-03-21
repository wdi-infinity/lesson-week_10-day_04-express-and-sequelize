import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


// // middleware
// app.use(bodyParser.json());


//defind router
const router=express.Router();


// Add people list API endpoint with dummy data
// get all people
router.get('/api/people',(req,res)=>{
 models.Person.findAll()
.then(people=>res.status(200).json({
    peopleKey:people 
    //people from DB
})).catch(e=>console.log(e)); //connect express 

});

// read one person by record id from DB
router.get('/api/person/:id',(req,res)=>{
    // if user try to brok my server
    if(!isNaN(req.params.id)){
        //add route to find person by primary key
       models.Person.findByPk(req.params.id).then(person=> {
           if(person!=null)
           res.status(200).json({personKey:person});
           else
           res.status(404).json({error:"person not found"});
       }).catch(e=>console.log(e))
     }//end if
     else{
         res.status(406).json({error:'invalid id'});
     }
       // res.status(200).json({user_id: req.params.id});
});
   

// create new person 
router.post('/api/person',(req,res)=>{
    // the user should not create empty post
    if(Object.keys(req.body).length !== 0){
    models.Person.create(req.body)
    .then(person=>{
      res.status(201).json({result:person});// person from DB
    }).catch(e=> console.log(e))
}
else{
  res.status(400).json({error:'Your request is missing details '});}
});


// Update
router.put('/api/person/:id',(req,res)=>{
    //update
    //.params the params in url
      models.Person.update(
        {first_name:req.body.first_name,
        last_name:req.body.last_name},
        {where: {id:req.params.id}// updates the database with the new person name for the matching person id
    })
    
      .then(()=>{
          // the database was able to update the person
        res.status(200).json({message:"Updated successfully"});
      }).catch(e=> console.log(e))
    
    });

router.delete('/api/person/:id',(req,res)=>{
        models.Person.destroy({
            where: {
                id:req.params.id
            }//delete the person from database for the matching person id
        })
        .then(()=>{
            res.status(200).json({message:"Deleted successfully"});
          })
        .catch(e=> console.log(e));
});
    
export default router;
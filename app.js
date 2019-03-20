import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

//initate express
const app=express();
// middleware
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"Hello wdi-infinity"
  })
});
 
// Add people list API endpoint with dummy data

app.get('/api/people',(req,res)=>{
    models.Person.findAll()
.then(people=>res.status(200).json({
    peopleKey:people 
    //people from DB
}))
.catch(e=>console.log(e)); //connect express 
  });

  // read one person by record id from DB
app.get('/api/person/:id',(req,res)=>{
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
app.post('/api/person',(req,res)=>{
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
app.put('/api/person/:id',(req,res,next)=>{
//update
  models.Person.update(
      {first_name:req.body.first_name,
      last_name:req.body.last_name},
      {where: {id:req.params.id}// updates the database with the new person name for the matching person id
})

  .then(()=>{
    res.status(200).json({message:"Updated successfully"});
  }).catch(e=> console.log(e))

});

app.delete('/api/person/:id',(req,res)=>{
    Model.destroy({
        where: {
            // criteria
        }
    })
//     console.log(req.body)
//     if(req.body){
//     models.Person.create(req.body)
//     .then(person=>{
//       res.status(201).json({result:person});// person from DB
//     }).catch(e=> console.log(e))
// }
// else{
//   res.status(200).json({error:'there is no person data '});}
});

const port=3000;
app.listen(port,() => console.log(`express-api app listening on port ${port}`));


//connect sqluelize with express

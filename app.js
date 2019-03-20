import express from 'express';
import models from './models';

//initate express
const app=express();

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"Hello wdi-infinity"
  })
});
 
// const people=[
//     {firstName:'B',lastName:'BA'},
//     {firstName:'A',lastName:'AB'},
//     {firstName:'C',lastName:'CA'}];

// Add people list API endpoint with dummy data
app.get('/api/people',(req,res)=>{
    models.Person.findAll()
.then(people=>res.status(200).json({
    peopleKey:people 
    //people from DB
}))
.catch(e=>console.log(e)); //connect express 
    
//    res.status(200).json({
//         peopleKey:people // from array
//     });
  });

app.get('/api/person/:id',(req,res)=>{
 // if user try to brok my server
 if(!isNaN(req.params.id)){
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

 const port=3000;
app.listen(port,() => console.log(`express-api app listening on port ${port}`));


//connect sqluelize with express

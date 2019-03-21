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
app.put('/api/person/:id',(req,res)=>{
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

app.delete('/api/person/:id',(req,res)=>{
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
app.get('/api/articles',(req,res)=>{
  models.Article.findAll().then(articles=>{
    res.status(200).json({articlesKey:articles})
  }).catch(e=>console.log(e));

});

const port=3000;
app.listen(port,() => console.log(`express-api app listening on port ${port}`));


//connect sqluelize with express
//usman solve --> Delete existing Person by Record ID
// app.delete('/api/person/:id',(req,res)=> {
//     models.Person.findByPk(req.params.id)
//     .then(person => {

//        person.destroy().then(()=> {
//            res.status(200).json({
//                result: `Record ID ${req.params.id} Deleted` , 
//                success: true
//            });
//        })
//        .catch(e => console.log(e));

//     })
//  .catch(e => console.log(e));

// });

// update 
// Update an existing Person
// http://localhost:3000/api/person/533
// app.put('/api/person/:id', (req, res) => {
  // Find Person By ID sent to us by User in the URL
//   models.Person.findByPk(req.params.id).then(person => {
    // Call the Update function on the Person the database sent us back.
    // Only update the fields I care about.
    // person.update({
    //   first_name: req.body.first_name,
    //   last_name: req.body.last_name
    // }).then(person => {
      // The database was able to update the user
      // And it sent us back an updated Record with the new information
      // We can now send back this new information to the user
//       res.status(200).json({ person: person });
//     }).catch(e => console.log(e));

//   }).catch(e => console.log(e));
// });
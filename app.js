import express from 'express';
import models from './models';
import bodyParser from 'body-parser';

const PORT = 3000;
const app = express();


///middleware////

app.use(bodyParser.json());



/// routes ///

///route path ///
app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})

///get all people ///
app.get('/api/people',(req,res)=>{
   models.Person.findAll()
   .then(peopleFromDB =>{
    
    res.status(200).json({
        people: peopleFromDB
   })
   .catch(e=> console.log(e));

    });
});

/// get person by record ID ////
app.get('/api/person/:id', (req, res) => {
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


//create new record
 app.post('/api/person', (req,res)=>{
    models.Person.create(req.body)

    .then(personNewFromDB => {

     res.status(201).json({person:personNewFromDB})
    })
    .catch(e => console.log(e));
 });


//update 

// Update an existing Person

app.put('/api/person/:id', (req, res) => {
  // Find Person By ID sent to us by User in the URL
  models.Person.findByPk(req.params.id).then(person => {
    // Call the Update function on the Person the database sent us back.
    // Only update the fields I care about.
    person.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name
    }).then(person => {
      // The database was able to update the user
      // And it sent us back an updated Record with the new information
      // We can now send back this new information to the user
      res.status(200).json({ person: person });
    }).catch(e => console.log(e));

  }).catch(e => console.log(e));
});


//Delete

//my solve
// app.delete('/api/person/:id',(req,res)=> {
//     models.Person.destroy({
//         where: {id: req.params.id }
//     })
//   .then(person => {
//     res.status(201).json({message: "sucsess"})
//   })
//   .catch(e => console.log(e));

// });



//usman solve
app.delete('/api/person/:id',(req,res)=> {
      models.Person.findByPk(req.params.id)
      .then(person => {

       person.destroy().then(()=> {
           res.status(200).json({
               result: `Record ID ${req.params.id} Deleted` , 
               success: true
           });
       })
       .catch(e => console.log(e));
    })
        .catch(e => console.log(e));
});


// http://localhost:3000/api/articles
    ///get all the articles///
app.get('/api/articles', (req, res)=>{
  models.Article.findAll()
  .then(articles => {
   res.status(200).json({articles:articles})
  })
.catch(e=> console.log(e));
})



  /// get Article by record ID ////
app.get('/api/article/:id',(req,res)=>{
 models.Article.findByPk(req.params.id)
 .then(article => {
   res.status(200).json({article:article})
 })
  .catch(e=> console.log(e));
})

app.listen(PORT, () => {
  console.log("server running on port"+PORT)
});
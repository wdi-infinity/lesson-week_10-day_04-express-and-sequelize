import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes'
import articleRouter from './routes/articleRoutes'

//initate express
const app=express();
// middleware

app.use(bodyParser.json());
app.use(articleRouter);
app.use(peopleRouter);

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"Hello wdi-infinity"
  })
});

app.get('/api/person/:id/articles',(req,res)=>{
  models.Person.findByPk(req.params.id,{include:[{model:models.Article}]}).then(person=>{
      res.status(200).json({person:person})
  }).catch(e=>console.log(e));
});
// if someone run my app I want seqluize run these sync 
// database synchronise
models.sequelize.sync().then(()=>{
  // evrey time the user run server will be excute //

  console.log('sync complete');
  // models.Article.create({
  //     title:'test',
  //     content:'this is a test',
  //     PersonId:1
  // })
  const port=3000;
  app.listen(port,() => console.log(`express-api app listening on port ${port}`));
})


//   **************  Usman solve  ***************

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
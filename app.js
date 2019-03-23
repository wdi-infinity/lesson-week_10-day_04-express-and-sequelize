import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './route/peopleRoutes';
import articleRouter from './route/articleRoutes'


const app = express();
// localhost:3000
const port = 3000;

// Midle ware
app.use(bodyParser.json());
app.use(peopleRouter)
app.use(articleRouter)



//Rout path
app.get('/', (req,res) => {
 res.status(200).json({
 message: 'Hello WDI-infinty'
 });
});



// const people = [
//     {firstName: 'Abdullah', lastName:'Adel'},
//     {firstName: 'Ali', lastName:'Adel'},
//     {firstName: 'Micheal', lastName:'Fimann'}
// ];




 


// app.delete('/api/person/:id', (req, res) => {
//     const id = parseInt(req.params.id, 10);
  
    
//          models.Person.update(index, 1);
//          return res.status(200).send({
//            success: 'true',
//            message: 'posts deleted successfuly',
//          });
//       }
//     });
  
  
//       return res.status(404).send({
//         success: 'false',
//         message: 'todo not found',
//       });
  
   
//   });


  
// app.get('/api/articles', (req , res) => {
//     res.status(200).json({
//         message: 'Hello from articles'
//     })
// })










// http://localhost:3000/api/article/2/articles

// get all articles by person record ID








// http://localhost:3000/api/person/1/articles
// Get All Articles by Person Record ID
app.get('/api/person/:id/articles', (req, res) => {
    
    models.Person.findByPk(req.params.id, {include: [{model : models.Article}] }).then(person =>{
        res.status(200).json({ person : person });
    }).catch(e => console.log(e));
    
  });



models.sequelize.sync().then(() => {
    console.log('sync complete');


    // This way to add data witout useing seeds
// models.Article.create({

//     title: 'test',
//     content: 'this is a body',
//     PersonId:2

// });

app.listen(port, () => console.log(`express-api app listening on port ${port}`));
})


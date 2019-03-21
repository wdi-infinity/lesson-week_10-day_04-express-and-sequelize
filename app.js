import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './route/peopleRoutes';


const app = express();
// localhost:3000
const port = 3000;

// Midle ware
app.use(bodyParser.json());
app.use(peopleRouter)



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


// localhost:3000/api/articles

app.get('/api/articles', (req , res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles : articles });
    }).catch(e => console.log(e));
       
    
})




// localhost:3000/api/articles/1

app.get('/api/article/:id', (req, res) => {
    if( !isNaN(req.params.id)){
           models.Article.findByPk(req.params.id).then(article => {
               if(article !== null){
               res.status(200).json({ article: article });
               } else {
                   res.status(404).json({ error: 'Person Not Found' }); 
               }
           })
           .catch(e => console.log(e));
} else {
   res.status(406).json({error: 'Invalid ID'})
}
 });


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


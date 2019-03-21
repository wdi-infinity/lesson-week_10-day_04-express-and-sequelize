import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';

const PORT = 3000;
const app = express();


///middleware////

app.use(bodyParser.json());
app.use(peopleRouter);


/// routes ///

///route path ///
app.get('/', (req ,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity'
    })
})
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



//Get all articels by person ID
 app.get('/api/person/:id/articles',(req,res)=>{

    models.Person.findByPk(req.params.id,{include:[{model : models.Article}]})
    .then(person =>{
     
     res.status(200).json({
         person: person
    })
   
 
     }).catch(e=> console.log(e));
 })

models.sequelize.sync()
.then(()=> {
    console.log('sync complete');

    models.Article.create({
        title: 'test',
        content: 'this is a body',
        PersonId:2
    })

    
app.listen(PORT, () => {
  console.log("server running on port"+PORT)
})

});
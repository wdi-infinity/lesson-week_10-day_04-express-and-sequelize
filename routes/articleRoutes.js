import express from 'express';
import models from '../models';




const router = express.Router();


// http://localhost:3000/api/articles
    ///get all the articles///
    router.get('/api/articles', (req, res)=>{
        models.Article.findAll()
        .then(articles => {
         res.status(200).json({articles:articles})
        })
      .catch(e=> console.log(e));
      })
      
      
      
        /// get Article by record ID ////
      router.get('/api/article/:id',(req,res)=>{
       models.Article.findByPk(req.params.id)
       .then(article => {
         res.status(200).json({article:article})
       })
        .catch(e=> console.log(e));
      })
      
      
      
      //Get all articels by person ID
       router.get('/api/person/:id/articles',(req,res)=>{
      
          models.Person.findByPk(req.params.id,{include:[{model : models.Article}]})
          .then(person =>{
           
           res.status(200).json({
               person: person
          })
         
       
           }).catch(e=> console.log(e));
       })
      
      
       //create new article
       router.post('/api/article', (req,res)=>{
          models.Article.create(req.body)
      
          .then(articleNewFromDB => {
      
           res.status(201).json({article:articleNewFromDB})
          })
          .catch(e => console.log(e));
       });
      
      //delete an articel by its ID
        router.delete('/api/article/:id',(req,res)=> {
          models.Article.findByPk(req.params.id)
          .then(article => {
      
           article.destroy().then(()=> {
               res.status(200).json({
                   result: `Articel ID ${req.params.id} Deleted` , 
                   success: true
               });
           })
           .catch(e => console.log(e));
        })
            .catch(e => console.log(e));
      });
      
      
      
      // Update an existing articel
      
       router.put('/api/article/:id', (req, res) => {
          // Find Article By ID sent to us by User in the URL
          models.Article.findByPk(req.params.id).then(article => {
            // Call the Update function on the Article the database sent us back.
            // Only update the fields I care about.
            article.update({
              title: req.body.title,
              content: req.body.content
            }).then(article => {
              // The database was able to update the article
              // And it sent us back an updated Record with the new information
              // We can now send back this new information to the user
              res.status(200).json({ article: article});
            }).catch(e => console.log(e));
        
          }).catch(e => console.log(e));
        });




export default router;
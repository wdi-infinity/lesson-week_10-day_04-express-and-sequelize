import express from 'express';
import models from '../models';

const router1=express.Router();

// add route to show all article
router1.get('/api/articles',(req,res)=>{
  models.Article.findAll().then(articles=>{
    res.status(200).json({articlesKey:articles})
  }).catch(e=>console.log(e));
});

// get one article by id 
// add route to show article details
router1.get('/api/articles/:id',(req,res)=>{
  if(!isNaN(req.params.id)){
  models.Article.findByPk(req.params.id).then(article=>{
      res.status(200).json({article:article})
  }).catch(e=> console.log(e));
}
  else{
    res.status(406).json({msg:'invalid id'})
  }
});


router1.post('/api/article',(req,res)=>{
  // the user should not create empty post
  if(Object.keys(req.body).length !== 0){
  models.Article.create(req.body)
  .then(article=>{
    res.status(201).json({result:article});// article from DB
  }).catch(e=> console.log(e))
}
else{
res.status(400).json({error:'Your request is missing details '});}
});

// Update
router1.put('/api/articles/:id',(req,res)=>{
  //.params the params in url
    models.Article.update(
      {title: req.body.title,
      content: req.body.content},
      {where: {id:req.params.id}// updates the database with the new artical name for the matching artical id
  })
  
    .then(()=>{
        // the database was able to update the article
      res.status(200).json({message:"Updated successfully"});
    }).catch(e=> console.log(e))
  
  });

// delete
router1.delete('/api/articles/:id',(req,res)=>{
      models.Article.destroy({
          where: {
              id:req.params.id
          }//delete the artical from database for the matching artical id
      })
      .then(()=>{
          res.status(200).json({message:"Deleted successfully"});
        })
      .catch(e=> console.log(e));
});


export default router1;
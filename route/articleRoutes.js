import express from 'express';
import models from '../models';
import bodyParser from 'body-parser';


const router = express.Router();


// localhost:3000/api/articles

router.get('/api/articles', (req , res) => {
    models.Article.findAll().then(articles => {
        res.status(200).json({ articles : articles });
    }).catch(e => console.log(e));
       
    
})


// localhost:3000/api/articles/1

router.get('/api/article/:id', (req, res) => {
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




// create new article 
router.post('/api/articles', (req,res) => {
    models.Article.create(req.body)
    .then(article => {
        res.status(201).json({ article: article});
    })
    .catch(e => console.log(e));
 });



 // delete the article 
router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
    .then(article => {
        article.destroy().then(() => {
            res.status(200).json({
                result: `Record ID ${req.params.id} deleted`,
                success: true
            })
        })
    })
    .catch(e => console.log(e));
 });



 router.put('/api/article/:id', (req, res) => {
    // Find article By ID 
    models.Article.findByPk(req.params.id)
    .then(article => {
         // Call the Update function on the Article the database sent us back.
        // Only update the fields I care about. 
        article.update({
            title: req.body.title,
            content: req.body.content
        }).then(article => {
            res.status(200).json({ article : article });
        }).catch(e => console.log(e));
    })
    .catch(e => console.log(e));
 });



export default router;
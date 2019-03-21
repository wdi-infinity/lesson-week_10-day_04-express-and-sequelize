import express from 'express';
import models from '../models'
import bodyParser from 'body-parser';

const router = express.Router();

export default router;


//localhost:3000/api/articles display all list
router.get('/api/articles' , (req , res ) => {
    //Find all people
    models.Article.findAll()
    .then(articles => {
        // //display table of people
        res.status(200).json({ articles: articles })
    })
    .catch( e => console.log(e))
  
})

router.get('/api/article/:id' , (req , res ) => {

    const id = req.params.id
    if(!isNaN(id)){
    models.Article.findByPk(id)//One person

    .then(article => {
        if (article !== null){
        res.status(200).json({  article: article  })
        }
        else {
            res.status(404).json({  error: 'article Not Found'  })
        }
    })
    .catch( e => console.log(e))
}
else {
    res.status(406).json({  error: 'Invalid ID'  })
}
})

router.post('/api/articles' , (req, res) => {
    models.Article.create({title: req.body.title , content: req.body.content})
    .then(article => {
        res.status(200).json({article : article})
    })
    .catch( e => console.log(e))
})

router.put('/api/person/:id' , (req , res) => {
   
    const id = req.params.id
    models.Article.findByPk(id)
    .then( article => {
        article.update({ title: req.body.title , content: req.body.content }) 
        res.status(201).json({article: article})
    })
    .catch( e => console.log(e))
  
})

router.delete('/api/person/:id', (req, res) => {
    const id = req.params.id
    models.Article.findByPk(id)
      .then(article => {
        article.destroy().then(() => {
          res.status(200).json({
            result: `Record ID ${id} Deleted`,
            success: true
          });
        })
        .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  });
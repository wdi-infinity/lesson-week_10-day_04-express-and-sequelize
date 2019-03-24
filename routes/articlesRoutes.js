import express from 'express';
import models from '../models'; //2 points cause it is under the app
import bodyParser from 'body-parser';

const router = express.Router();

//http://localhost:3000/api/articles
router.get('/api/articles',(req,res)=>{

    models.Article.findAll().then(articles => {
        res.status(200).json({articles: articles});
    }).catch(e => console.log(e));
    })
    
    //For test
    //res.status(200).json({msg:'working'});
    
    //http://localhost:3000/api/articles/2
    router.get('/api/article/:id',(req,res)=>{
    //For test
    //res.status(200).json({ msg: 'still working'});
    models.Article.findByPk(req.params.id).then(article =>
        {
    res.status(200).json({article:article})
    
        }).catch(e => console.log(e));
    
    })
    
    
    //I want to listen to the request unless sync to happened
    //use alter:true not force to keep your database but we couldn't and it cause an error
    //http://localhost:3000/api/article/2/comments
    //http://localhost:3000/api/person/1/articles
    //Get All Articles by Person Record ID
    router.get('/api/person/:id/articles',(req,res) => {
        //to show each person with his/her Article
        models.Person.findByPk(req.params.id,{include:[{model:models.Article}]})
        .then(person =>
            {
        res.status(200).json({person:person})
        
            }).catch(e => console.log(e));
    })



    //post
//no need for id cause the db will do it for me
router.post('/api/person',(req,res) =>  {
    //need to test your data first
    models.Article.create(req.body)
    .then(articleNewFromDB => {
        res.status(201).json({ person:articleNewFromDB });

    })
    .catch(e => console.log(e));

});


//To update
router.put('/api/article/:id', (req, res) => {
    //Find Person By ID sent to us by User in the URL
        models.Article.findByPk(req.params.id).then (article => {
            //call the UPDATE function on the Person the database sent us back.
            //only update the fields I care about.
            article.update({
            title:req.body.title,
            content:req.body.content
        }).then (article =>{
            //The database was able to update the user
            //and it sent us back an updated Recored with the new  one
            res.status(200).json({ article: article });
        }).catch(e => console.log(e));

        }).catch(e => console.log(e));

    });



//To delete exiting Person by record Id 
//find the record first
//then delete it 
router.delete('/api/article/:id', (req, res) => {
    models.Article.findByPk(req.params.id)
    //person is reference to the record
    .then(article => {
        article.destroy()
        .then(()=>{res.status(200).json({
            result:`Record ID ${req.params.id} Deleted`,
            success: true
        });
        
    })
    .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});
export default router;
   
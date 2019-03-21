//you have to add this by yourself
import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
import peopleRouter from './routes/peopleRoutes';

const app = express();
const port =3000;
/**Middleware */
app.use(bodyParser.json());
app.use(peopleRouter);



//Routes

//Root Path
app.get ('/',(req,res)=>{
res.status(200).json({
message: "Hello WDI-Infinity!"
});

});



// const people = [
// {firstName:'Waad',lastName:'Baabdullah'},
// {firstName:'Asma',lastName:'Baabdullah'},
// {firstName:'Afrah',lastName:'Baabdullah'},
// {firstName:'Samah',lastName:'Baabdullah'},
// {firstName:'Tahani',lastName:'Baabdullah'},
// {firstName:'khalid',lastName:'Baabdullah'},
// {firstName:'Mohammad',lastName:'Baabdullah'}
// ];


//new route
//localhost:3000
//localhost:3000/api/people api is a convention
//each apis must come after localhost:3000/api/ is the best way  


//Get All people
app.get('/api/people', (req, res) => {
    models.Person.findAll()
    //read data from database
      .then(peopleFromDB => {
        res.status(200).json({
          people: peopleFromDB
        });
      })
      .catch(e => console.log(e));
  });

//Get person by Recored ID
//http://localhost:3000/api/person/2


//http://localhost:3000/api/articles
app.get('/api/articles',(req,res)=>{

models.Article.findAll().then(articles => {
    res.status(200).json({ articles: articles });
}).catch(e => console.log(e));
})

//For test
//res.status(200).json({msg:'working'});

//http://localhost:3000/api/articles/2
app.get('/api/article/:id',(req,res)=>{
//For test
//res.status(200).json({ msg: 'still working'});
models.Article.findByPk(req.params.id).then(article =>
    {
res.status(200).json({article: article})

    }).catch(e => console.log(e));

})


//I want to listen to the request unless sync to happened
//use alter:true not force to keep your database but we couldn't and it cause an error
//http://localhost:3000/api/article/2/comments
//http://localhost:3000/api/person/1/articles
//Get All Articles by Person Record ID
app.get('/api/person/:id/articles',(req,res) => {
    //to show each person with his/her Article
    models.Person.findByPk(req.params.id,{include:[{model:models.Article}]})
    .then(person =>
        {
    res.status(200).json({person: person})
    
        }).catch(e => console.log(e));
})

////http://localhost:3000/api/p/article/1/comments





models.sequelize.sync().then(()=>{
console.log('sync complete');
// models.Article.create({
// title: 'test',
// content:'this is a body',
// PersonId:1

});
app.listen(port,()=>console.log(`express-api app listening on port ${port}!`));

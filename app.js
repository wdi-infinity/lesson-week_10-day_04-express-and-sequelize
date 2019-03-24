//you have to add this by yourself
import express from 'express';
import models from './models';
import bodyParser from 'body-parser';
 import peopleRouter from './routes/peopleRoutes';
 import articleRouter  from './routes/articleRoutes';
const app = express();
const port =3000;
/**Middleware */
app.use(bodyParser.json());
app.use(peopleRouter);
app.use(articleRouter);


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






////http://localhost:3000/api/p/article/1/comments





models.sequelize.sync()
.then(()=>{
console.log('sync complete');
// models.Article.create({
// title: 'test',
// content:'this is a body',
// PersonId:1
app.listen(port,()=>
 {console.log(`express-api app listening on port ${port}!`)})
});


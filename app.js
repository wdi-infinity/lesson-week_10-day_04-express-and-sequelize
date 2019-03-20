import express from 'express';
const app = express();
const port =3000;
app.get ('/',(req,res)=>{
res.status(200).json({
message: "Hello WDI-Infinity!"
});

});



const people = [
{firstName:'Waad',lastName:'Baabdullah'},
{firstName:'Asma',lastName:'Baabdullah'},
{firstName:'Afrah',lastName:'Baabdullah'},
{firstName:'Samah',lastName:'Baabdullah'},
{firstName:'Tahani',lastName:'Baabdullah'},
{firstName:'khalid',lastName:'Baabdullah'},
{firstName:'Mohammad',lastName:'Baabdullah'}
];


//new route
//localhost:3000
//localhost:3000/api/people api is a convention
//each apis must come after localhost:3000/api/ is the best way  
app.get('/api/people',(req,res)=>{
res.status(200).json({
people:people
});

});


app.listen(port,()=>console.log(`express-api app listening on port ${port}!`));
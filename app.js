import express from 'express';

//initate express
const app=express();

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"Hello wdi-infinity"
  })
});
 

const people=[
    {firstName:'B',lastName:'BA'},
    {firstName:'A',lastName:'AB'},
    {firstName:'C',lastName:'CA'}];

// Add people list API endpoint with dummy data
app.get('/api/people',(req,res)=>{
    res.status(200).json({
        peopleKey:people
    });
  });
 const port=3000;

app.listen(port,()=> console.log(`express-api app listening on port ${port}`));

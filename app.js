import express from 'express';

//initate express
const app=express();

app.get('/',(req,res)=>{
  res.status(200).json({
    message:"Hello wdi-infinity"
  })
});
 
 const port=3000;

app.listen(port,()=> console.log(`express-api app listening on port ${port}`));
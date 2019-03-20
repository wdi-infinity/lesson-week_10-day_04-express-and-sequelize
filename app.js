import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req,res) => {
 res.status(200).json({
 message: 'Hello WDI-infinty'
 });
});



const people = [
    {firstName: 'Abdullah', lastName:'Adel'},
    {firstName: 'Ali', lastName:'Adel'},
    {firstName: 'Micheal', lastName:'Fimann'}
];


app.get('/api/people', (req,res) => {
    res.status(200).json({
    people: people
    });
   });
   


// localhost:3000



app.listen(port, () => console.log(`express-api app listening on port ${port}`));
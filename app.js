import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.status(200).json({
    message: 'Hello WDI-Infinity'
});
});


const people = [
    { firstName: 'Ahmad', lastName:'Almansor' },
    { firstName: 'Abdullah', lastName:'Ahmad' },
    { firstName: 'Abdullah', lastName:'Alfehaid' },
    { firstName: 'Ahmad', lastName:'Almansor' },
    { firstName: 'Ahmad', lastName:'Almansor' }    
];


app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
});
// localhost:3000/
// localhost:3000/api/people


app.listen(3000, () => console.log(`express-api app listening on port ${port}`));

import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

const people = [ 
    {firstNAme: 'Anfal',lastName: 'Aljaferi'},
    {firstNAme: 'Saja',lastName: 'Algadhi'},
    {firstNAme: 'Hala',lastName: 'Almaimoni'}
];
app.get('/api/people', (req,res) => {
    res.status(200).json({
        people: people
    });
});

app.listen(port, () => console.log(`express-api app listening on port ${port}!`));


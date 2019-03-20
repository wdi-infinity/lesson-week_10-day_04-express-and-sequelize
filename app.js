import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello WDI-Infinity!"
    });
})
const people = [
    {
        firstName: 'SARA', lastName: 'ALYAHYA'
    },
    {
        firstName: 'Hessa', lastName: 'ALAQIL'
    },
    {
        firstName: 'Fajer', lastName: 'ALBAKIRI'
    }
];
// localhost:3000
// localhost:3000/
app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
})

app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
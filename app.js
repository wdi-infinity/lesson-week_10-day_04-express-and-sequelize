import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
});

const people = [
    { firstName: 'Rawan', lastName: 'Alahmmadi' },
    { firstName: 'Rawan1', lastName: 'Alahmmadi' },
    { firstName: 'Rawan2', lastName: 'Alahmmadi' },
    { firstName: 'Rawan3', lastName: 'Alahmmadi' },
    { firstName: 'Rawan4', lastName: 'Alahmmadi' },
    { firstName: 'Rawan5', lastName: 'Alahmmadi' }
]

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
});



app.listen(3000, () => console.log(`express-api listening on port ${port}!`))
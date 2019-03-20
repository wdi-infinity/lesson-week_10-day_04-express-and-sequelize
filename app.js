import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello wdi"
    })
})



const people = [
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' },
    { firstName: 'fajer', lastName: 'saleh' }
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
})

app.listen(port, () => console.log(`express-api listening on port ${port}!`))
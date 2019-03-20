import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI'
    });
});



app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: peopleList
    });
});

const peopleList = [
    { firstName: 'Mohammed', lastName: 'Jameel' },
    { firstName: 'Ahmed', lastName: 'Salaman' },
    { firstName: 'Waleed', lastName: 'Ahmed' },
    { firstName: 'Salem', lastName: 'Shehri' }
];

app.listen(port, () => console.log(`express-api app listeing on port ${port}!`))
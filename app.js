import express from 'express';

const app = express();

const port = 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from WDI 3'
    });
});
const people = [
    {
        firstName: 'Sara', lastName: 'Alawfi'
    },
    {
        firstName: 'Moroj', lastName: 'Alawfi'
    },
    {
        firstName: 'Alaa', lastName: 'Alawfi'
    },
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });

});

app.listen(port, () => console.log(`express-api app listen to port 3000 ${port}`))
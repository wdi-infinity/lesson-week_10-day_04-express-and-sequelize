import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!!!'
    });
});

const peopleList = [
    {firstName: 'Abdulrahman', lastName: 'Alibrahim'},
    {firstName: 'Usman', lastName: 'Bashir'},
    {firstName: 'Michael', lastName: 'Finneran'},
    {firstName: 'Ghadeer', lastName: 'AlKhathlan'},
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: peopleList;
    });
});

app.listen(port, () => console.log(`express-api app listening on port ${port}!`))

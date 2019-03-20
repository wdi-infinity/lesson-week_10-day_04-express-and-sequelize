import express from 'express';

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello"
    });
});

const peopleList =[
    {first_name: "Salem", last_name: "Turki"},
    {first_name: "Usman", last_name: "Basheer"},
    {first_name: "Ghadeer", last_name: "Turki"},
    {first_name: "Mohammad", last_name: "Jameel"},
    {first_name: "Hussah", last_name: "Alakeel"}
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
    people: peopleList
    });
});



// localhost: 3000
// localhost: 3000/

app.listen(port, () => console.log(`express-api and listening on port ${port}!`));
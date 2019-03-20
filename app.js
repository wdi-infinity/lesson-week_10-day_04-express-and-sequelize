import express from 'express';

const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.status(200).json({
        message:'Hello WDI-Unfinity!'
    });
});

const peopleList = [
    { firstName: 'Mohammmed', lastName: 'Rashidi' },
    { firstName: 'Michael', lastName: 'Finneran' },
    { firstName: 'Ghadeer', lastName: 'ALkhathlan' },
    { firstName: 'Saja', lastName: 'Algadhi' },
    { firstName: 'Ahmed', lastName: 'Alqahtani' },
    {firstName:'Hessa', lastName:'ALaqeel'},
    { firstName: 'Abdullah', lastName: 'Rashidi' },

]

app.get('/api/people',(req, res)=>{
    res.status(200).json({
        people: peopleList
    })
})

app.listen(3000, () => console.log(`express-api app listing on port ${port}!`));
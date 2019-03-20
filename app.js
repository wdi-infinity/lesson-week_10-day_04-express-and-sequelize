import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello WDI-Infinity!'
    });
});

const peopleList = [
  { firstName: 'Ahmad', lastName: 'Yaseen'},
  { firstName: 'Abdulrahman', lastName: 'Alibrahim'},
  { firstName: 'Usman', lastName: 'Bashir'},
  { firstName: 'Micheal', lastName: 'Finneran'},
  { firstName: 'Ghadeer', lastName: 'Alkhathlan'},
  { firstName: 'Saja', lastName: 'Alghadi'},
  { firstName: 'Ahmad', lastName: 'Alqahtani'}
];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: peopleList
    });
});

app.listen(port, () => console.log(`express-api app listening on port ${port}!`));
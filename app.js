import express from 'express';

const app = express();
const port=3000;

// localhost: 3000/
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello WDI-Infinity!',
  });
});

const people = [
  { firstName: 'alia', lastName: 'alrashidi' },
  { firstName: 'usman', lastName: 'bashir' },
  { firstName: 'ghdeer', lastName: 'alkhathlan' },
  { firstName: 'michael', lastName: 'finneran' },
  { firstName: 'fajer', lastName: 'albakiri' },
];


// localhost: 3000/api/people
app.get('/api/people', (req, res) => {
  res.status(200).json({
    people: people,
  });
});
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`express-api app listening on port ${port}!`));

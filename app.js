import express from 'express';
import { log } from 'util';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello WDI-Infinity!' });
});

const PEOPLE = [
  { firstName: 'Ayman', lastName: 'Faisal' },
  { firstName: 'Abdullah', lastName: 'Alfehaid' },
  { firstName: 'Yasser', lastName: 'Faisal' },
];

app.get('/api/people', (req, res) => {
  res.status(200).json({ people: PEOPLE });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`express-api app listening on port ${PORT}`));

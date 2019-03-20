import express from 'express';

const app = express();
const port = 3000;

//  routre
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello ppl !"
    });
});

// new routre
// app.get('/api/people', (req, res) => {
//     res.status(200).json({
//         message: "API/PEOPLE Works!"
//     });
// });

const people = [
    { firstName: 'Hes', lasName: 'Aqeel' },
    { firstName: 'Hal', lasName: 'Maimoni' },
    { firstName: 'Sara', lasName: 'Yahya' },
    { firstName: 'Rawan', lasName: 'Ahmadi' }

];

app.get('/api/people', (req, res) => {
    res.status(200).json({
        people: people
    });
});
app.listen(port, () => console.log(`express-api listening on port ${port}`))
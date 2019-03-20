import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.status(200).json({
        message: "Hello WDI-infinity"
    });
});
const people = [
    {firstName: 'saud', lastName: 'Almutairi'},
    {firstName: 'nors', lastName: 'Abdullah'},
    {firstName: 'mohammed', lastName: 'Saja'},
]
app.get('/api/people', (req, res) => {
    res.status(200).json({
        //the first people is just the key, so it's changable but not the second one.
        people: people
    });
});


app.listen(port, ()=> console.log(`working on port ${port}`));